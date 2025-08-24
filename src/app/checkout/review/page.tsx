"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShoppingBag,
  CreditCard,
  Tag,
  ChevronRight,
  Package,
  ArrowLeft,
  Truck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useCheckoutOrder } from "@/hooks/order/order.hooks";
import { formatPrice } from "@/lib/format-price";
import { ICheckoutItem } from "@/interface/order/cart.interface";
import { useShippingMethods } from "@/hooks/shipping.hooks";
import { useValidVouchers } from "@/hooks/voucher.hooks";
import { IVoucher } from "@/interface/voucher.interface";
import { IShipping } from "@/interface/shipping.interface";
import SelectedVoucherCard from "@/components/checkout/selected-voucher-card";
import { fi } from "date-fns/locale";
import { ICheckoutSession } from "@/interface/order/order.interface";

const PAYMENT_METHODS = [
  {
    id: "VNPAY",
    name: "VNPay",
    type: "vnpay",
    description: "Thanh toán qua VNPay",
    icon: "💳",
  },
  {
    id: "MOMO",
    name: "MoMo",
    type: "momo",
    description: "Thanh toán qua ví MoMo",
    icon: "📱",
  },
  {
    id: "COD",
    name: "Thanh toán khi nhận hàng",
    type: "cod",
    description: "Thanh toán bằng tiền mặt khi nhận hàng",
    icon: "💵",
  },
];

export default function CheckoutReviewPage() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<{
    selectedItems: string[];
    items: ICheckoutItem[];
    totalAmount: number;
    selectedCount: number;
  } | null>(null);

  const [selectedShipping, setSelectedShipping] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("COD");
  const [selectedVoucher, setSelectedVoucher] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  const {
    data: shippingData,
    isLoading: isLoadingShipping,
    error: shippingError,
  } = useShippingMethods();

  const {
    data: voucherData,
    isLoading: isLoadingVouchers,
    error: voucherError,
  } = useValidVouchers();

  const reviewOrderMutation = useCheckoutOrder();
  // const reviewOrderMutation = useReviewOrder();

  const shippingMethods = useMemo(() => {
    return shippingData?.data || [];
  }, [shippingData?.data]);

  const availableVouchers = useMemo(() => {
    return voucherData?.data || [];
  }, [voucherData?.data]);

  useEffect(() => {
    const savedData = localStorage.getItem("checkoutData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        console.log("Loaded checkout data:", parsed);
        setCheckoutData(parsed);
      } catch (error) {
        console.error("Error parsing checkout data:", error);
        toast.error("Có lỗi xảy ra khi tải dữ liệu checkout");
        router.push("/cart");
      }
    } else {
      toast.error("Không tìm thấy dữ liệu checkout");
      router.push("/cart");
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    if (shippingMethods.length > 0 && !selectedShipping) {
      // Ưu tiên chọn method active trước
      let methodToSelect = shippingMethods.find(
        (method: IShipping) => method.isActive
      );

      // Nếu không có method active, chọn method đầu tiên
      if (!methodToSelect) {
        methodToSelect = shippingMethods[0];
      }

      if (methodToSelect?._id) {
        setSelectedShipping(methodToSelect._id);
      }
    }
  }, [shippingMethods, selectedShipping]);

  useEffect(() => {
    console.log("SelectedVoucher:", selectedVoucher);
  }, [selectedVoucher]);

  const calculateVoucherDiscount = (
    voucher: IVoucher,
    subtotal: number
  ): number => {
    if (!voucher || !voucher.isActive) return 0;

    const now = new Date();
    const startDate = new Date(voucher.startDate);
    const endDate = new Date(voucher.endDate);
    if (now < startDate || now > endDate) return 0;

    if (voucher.minOrderValue && subtotal < voucher.minOrderValue) {
      return 0;
    }

    // if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
    //   return 0;
    // }

    let discount = 0;
    if (voucher.discountType === "PERCENTAGE") {
      discount = (subtotal * voucher.discountValue) / 100;
      if (voucher.maxDiscountValue && discount > voucher.maxDiscountValue) {
        discount = voucher.maxDiscountValue;
      }
    } else if (voucher.discountType === "FIXED") {
      discount = voucher.discountValue;
    }

    return Math.min(discount, subtotal);
  };

  const calculations = useMemo(() => {
    if (!checkoutData) return null;

    const subtotal = checkoutData.totalAmount;
    const shippingMethod = shippingMethods.find(
      (s: IShipping) => s._id === selectedShipping
    );
    const shippingPrice = shippingMethod?.price || 0;

    const selectedVoucherData = availableVouchers.find(
      (v: IVoucher) => v._id === selectedVoucher
    );
    const discountAmount = selectedVoucherData
      ? calculateVoucherDiscount(selectedVoucherData, subtotal)
      : 0;

    const finalAmount = Math.max(0, subtotal + shippingPrice - discountAmount);

    return {
      subtotal,
      shippingPrice,
      discountAmount,
      finalAmount,
      selectedVoucherData,
    };
  }, [
    checkoutData,
    selectedShipping,
    selectedVoucher,
    shippingMethods,
    availableVouchers,
  ]);

  const handleVoucherSelect = (voucherId: string) => {
    if (!checkoutData) return;

    const voucher = availableVouchers.find(
      (v: IVoucher) => v._id === voucherId

    );
    if (!voucher) return;

    if (!voucher.isActive) {
      toast.error("Voucher này hiện không khả dụng");
      return;
    }

    const now = new Date();
    const startDate = new Date(voucher.startDate);
    const endDate = new Date(voucher.endDate);

    if (now < startDate) {
      toast.error("Voucher này chưa có hiệu lực");
      return;
    }

    if (now > endDate) {
      toast.error("Voucher này đã hết hạn");
      return;
    }

    if (voucher.usageLimit == 0) {
      toast.error("Voucher này đã hết lượt sử dụng");
      return;
    }

    if (
      voucher.minOrderValue &&
      checkoutData.totalAmount < voucher.minOrderValue
    ) {
      toast.error(
        `Đơn hàng tối thiểu ${formatPrice(
          voucher.minOrderValue
        )} để sử dụng voucher này`
      );
      return;
    }

    setSelectedVoucher(voucherId);
    setIsVoucherModalOpen(false);
    toast.success(`Đã áp dụng voucher ${voucher.code}`);
  };

  const handleRemoveVoucher = () => {
    setSelectedVoucher("");
    toast.success("Đã bỏ voucher");
  };

  const handleReviewOrder = async () => {
    if (!checkoutData || !selectedShipping || !selectedPayment) {
      toast.error("Vui lòng chọn phương thức giao hàng và thanh toán");
      return;
    }

    try {
      const payload = {
        selectItemIds: checkoutData.selectedItems,
        shippingId: selectedShipping,
        paymentMethod: selectedPayment,
        ...(selectedVoucher && { voucherCode: selectedVoucher }),
      };

      console.log("Review order payload:", payload);

      const reviewData = await reviewOrderMutation.mutateAsync(payload);
      console.log("Review order response:", reviewData);

      // Lưu dữ liệu session để chuẩn bị cho checkout cuối
      const checkoutSession = {
        selectedItems: checkoutData.selectedItems,
        shippingMethodId: selectedShipping,
        paymentMethod: selectedPayment,
        voucherCode: selectedVoucher,
        totalAmount: checkoutData.totalAmount,
        shippingPrice: calculations?.shippingPrice || 0,
        discountAmount: calculations?.discountAmount || 0,
        finalAmount: calculations?.finalAmount  || 0,
      };

      localStorage.setItem("checkoutSession", JSON.stringify(checkoutSession));
      localStorage.setItem("orderReview", JSON.stringify(reviewData));

      console.log("Saved checkout session:", checkoutSession);
      console.log("Saved order review:", reviewData);

      // Chuyển đến trang checkout final để thực hiện đặt hàng thực sự
      router.push("/checkout/final");
    } catch (error) {
      console.error("Review order error:", error);

      // Log chi tiết lỗi
      if (error?.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
    }
  };

  // const handleReviewOrder = async () => {
  //   if (!checkoutData || !selectedShipping || !selectedPayment) {
  //     toast.error("Vui lòng chọn phương thức giao hàng và thanh toán");
  //     return;
  //   }

  //   try {
  //     const payload = {
  //       selectItemIds: checkoutData.selectedItems,
  //       shippingId: selectedShipping,
  //       paymentMethod: selectedPayment,
  //       ...(selectedVoucher && { voucherId: selectedVoucher }),
  //     };

  //     console.log("Review order payload:", payload);

  //     const reviewData = await reviewOrderMutation.mutateAsync(payload);

  //     console.log("Review order response:", reviewData);

  //     const checkoutSession: ICheckoutSession = {
  //       selectedItems: checkoutData.selectedItems,
  //       shippingMethodId: selectedShipping,
  //       paymentMethod: selectedPayment,
  //       voucherId: selectedVoucher,
  //       totalAmount: checkoutData.totalAmount,
  //       shippingPrice: calculations?.shippingPrice || 0,
  //       discountAmount: calculations?.discountAmount || 0,
  //       finalAmount: calculations?.finalAmount || 0,
  //     };

  //     localStorage.setItem("checkoutSession", JSON.stringify(checkoutSession));
  //     localStorage.setItem("orderReview", JSON.stringify(reviewData));

  //     console.log("Saved checkout session:", checkoutSession);
  //     console.log("Saved order review:", reviewData);

  //     router.push("/checkout/final");
  //   } catch (error) {
  //     console.error("Review order error:", error);
  //   }
  // };

  if (isLoading || isLoadingShipping) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {isLoading
              ? "Đang tải dữ liệu checkout..."
              : "Đang tải phương thức giao hàng..."}
          </p>
        </div>
      </div>
    );
  }

  if (shippingError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-500 mb-4">
            Không thể tải phương thức giao hàng
          </p>
          <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </div>
      </div>
    );
  }

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Không tìm thấy dữ liệu checkout</p>
          <Button onClick={() => router.push("/cart")} className="mt-4">
            Quay về giỏ hàng
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <ShoppingBag className="h-6 w-6 text-blue-900" />
              <h1 className="text-xl font-semibold text-gray-900">
                Xác nhận đơn hàng
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Sản phẩm đã chọn ({checkoutData.selectedCount})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {checkoutData.items.map((item) => (
                  <div
                    key={item.medicine_id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.packaging}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-lg font-semibold text-blue-900">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-sm text-gray-500">
                          Số lượng: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {formatPrice(item.totalPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

        
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Phương thức giao hàng
                </CardTitle>
              </CardHeader>
              {/* Thay thế phần CardContent trong shipping methods section */}
              <CardContent>
                <div className="space-y-4">
                  {isLoadingShipping ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-900 mx-auto"></div>
                      <p className="text-sm text-gray-500 mt-2">
                        Đang tải phương thức giao hàng...
                      </p>
                    </div>
                  ) : shippingError ? (
                    <div className="text-center py-4">
                      <p className="text-red-500">
                        Không thể tải phương thức giao hàng
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className="text-blue-600 underline mt-2 text-sm"
                      >
                        Thử lại
                      </button>
                    </div>
                  ) : shippingMethods.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500">
                        Không có phương thức giao hàng khả dụng.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {shippingMethods.map(
                        (method: IShipping, index: number) => {
                          // Auto select first method if none selected
                          if (index === 0 && !selectedShipping) {
                            setTimeout(
                              () => setSelectedShipping(method._id!),
                              0
                            );
                          }

                          return (
                            <div
                              key={`shipping-${method._id}-${index}`}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                selectedShipping === method._id
                                  ? "border-blue-500 bg-blue-50 shadow-sm"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => {
                                setSelectedShipping(method._id!);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <input
                                    type="radio"
                                    name="shipping-method"
                                    value={method._id}
                                    checked={selectedShipping === method._id}
                                    onChange={(e) =>
                                      setSelectedShipping(e.target.value)
                                    }
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                  />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      {method.icon && (
                                        <span className="text-lg">
                                          {method.icon}
                                        </span>
                                      )}
                                      <p className="font-semibold text-gray-900">
                                        {method.type}
                                      </p>
                                      {!method.isActive && (
                                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                                          Beta
                                        </span>
                                      )}
                                    </div>
                                    {method.description && (
                                      <p className="text-sm text-gray-500 mt-1">
                                        {method.description}
                                      </p>
                                    )}
                                    <div className="flex items-center gap-2 mt-2">
                                      {method.estimatedDays && (
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                          {method.estimatedDays}
                                        </span>
                                      )}
                                      {method.features &&
                                        method.features.length > 0 && (
                                          <>
                                            {method.features
                                              .slice(0, 2)
                                              .map((feature, idx) => (
                                                <span
                                                  key={idx}
                                                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                                >
                                                  {feature}
                                                </span>
                                              ))}
                                          </>
                                        )}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="font-bold text-lg text-blue-900">
                                    {method.price === 0
                                      ? "Miễn phí"
                                      : formatPrice(method.price)}
                                  </span>
                                  {method.minOrderValue > 0 && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      Tối thiểu:{" "}
                                      {formatPrice(method.minOrderValue)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}

                  {/* Thông tin bổ sung */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">
                        Thông tin giao hàng
                      </span>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">
                      🚚 Giao hàng tận nơi • ⏰ Theo dõi đơn hàng • 📞 Hỗ trợ
                      24/7
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Phương thức thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPayment === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="text-blue-600"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {method.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </CardContent>
            </Card>

            <SelectedVoucherCard
              selectedVoucher={calculations?.selectedVoucherData || null}
              discountAmount={calculations?.discountAmount || 0}
              isLoading={isLoadingVouchers}
              onSelectVoucher={() => setIsVoucherModalOpen(true)}
              onRemoveVoucher={handleRemoveVoucher}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tạm tính</span>
                      <span className="font-medium">
                        {formatPrice(calculations?.subtotal || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phí vận chuyển</span>
                      <span className="font-medium">
                        {calculations?.shippingPrice === 0
                          ? "Miễn phí"
                          : formatPrice(calculations?.shippingPrice || 0)}
                      </span>
                    </div>
                    {calculations &&
                      // calculations.discountAmount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Voucher giảm giá</span>
                          <span>
                            -{formatPrice(calculations.discountAmount)}
                          </span>
                        </div>
                      }
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Tổng cộng</span>
                      <span className="text-blue-900">
                        {formatPrice(calculations?.finalAmount || 0)}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={handleReviewOrder}
                    disabled={
                      reviewOrderMutation.isPending ||
                      // !isValidShippingSelection ||
                      !selectedPayment ||
                      !checkoutData
                    }
                    className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 text-white font-semibold py-3"
                  >
                    {reviewOrderMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        Đặt hàng
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      🔒 Thông tin của bạn được bảo mật an toàn
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isVoucherModalOpen} onOpenChange={setIsVoucherModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden bg-white">
          <DialogHeader className="bg-white">
            <DialogTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Chọn mã giảm giá
            </DialogTitle>
            <DialogDescription>
              Chọn voucher phù hợp để tiết kiệm chi phí đơn hàng
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-3 max-h-96 bg-white p-2">
            {isLoadingVouchers ? (
              <div className="text-center py-8 bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900 mx-auto"></div>
                <p className="text-gray-500 mt-2">Đang tải voucher...</p>
              </div>
            ) : voucherError ? (
              <div className="text-center py-8 bg-white">
                <Tag className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-500 mb-4">
                  Không thể tải danh sách voucher
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Thử lại
                </Button>
              </div>
            ) : availableVouchers.length === 0 ? (
              <div className="text-center py-8 bg-white">
                <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Không có voucher khả dụng</p>
              </div>
            ) : (
              availableVouchers
                .filter((voucher: IVoucher) => voucher.isActive)
                .map((voucher: IVoucher) => {
                  const now = new Date();
                  const isExpired = new Date(voucher.endDate) < now;
                  const isNotStarted = new Date(voucher.startDate) > now;
                  const isUsageLimitReached =
                    voucher.usageLimit == 0
                  const isOrderNotEligible =
                    checkoutData &&
                    voucher.minOrderValue > checkoutData.totalAmount;

                  const isDisabled =
                    isExpired ||
                    isNotStarted ||
                    isUsageLimitReached ||
                    isOrderNotEligible;

                  const discount = checkoutData
                    ? calculateVoucherDiscount(
                        voucher,
                        checkoutData.totalAmount
                      )
                    : 0;

                  return (
                    <div
                      key={voucher._id}
                      className={`p-4 border rounded-lg transition-colors bg-white ${
                        isDisabled
                          ? "border-gray-200 bg-gray-50 opacity-60"
                          : "border-gray-200 hover:border-blue-300 cursor-pointer hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        !isDisabled && handleVoucherSelect(voucher._id)
                      }
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {voucher.code}
                            </h3>
                            <Badge
                              variant={
                                voucher.discountType === "PERCENTAGE"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {voucher.discountType === "PERCENTAGE"
                                ? `${voucher.discountValue}%`
                                : formatPrice(voucher.discountValue)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {voucher.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {voucher.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {voucher.minOrderValue > 0 && (
                              <Badge variant="outline" className="text-xs">
                                Tối thiểu: {formatPrice(voucher.minOrderValue)}
                              </Badge>
                            )}
                            {voucher.maxDiscountValue > 0 &&
                              voucher.discountType === "PERCENTAGE" && (
                                <Badge variant="outline" className="text-xs">
                                  Tối đa:{" "}
                                  {formatPrice(voucher.maxDiscountValue)}
                                </Badge>
                              )}
                            <Badge variant="outline" className="text-xs">
                              Còn: {voucher.usageLimit}/
                              {voucher.usageLimit + voucher.usedCount}{" "}
                            </Badge>
                          </div>

                          <div className="text-xs text-gray-500 mt-1">
                            HSD:{" "}
                            {new Date(voucher.endDate).toLocaleDateString(
                              "vi-VN"
                            )}
                          </div>

                          {isDisabled && (
                            <div className="text-xs text-red-500 mt-1">
                              {isExpired && "Đã hết hạn"}
                              {isNotStarted && "Chưa có hiệu lực"}
                              {isUsageLimitReached && "Đã hết lượt sử dụng"}
                              {isOrderNotEligible &&
                                `Đơn hàng tối thiểu ${formatPrice(
                                  voucher.minOrderValue
                                )}`}
                            </div>
                          )}
                        </div>

                        {!isDisabled && discount > 0 && (
                          <div className="text-right">
                            <p className="text-sm font-semibold text-green-600">
                              Tiết kiệm
                            </p>
                            <p className="text-lg font-bold text-green-600">
                              {formatPrice(discount)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
