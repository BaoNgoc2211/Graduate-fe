import { ICart } from "@/interface/order/cart.interface";

const CartTab: React.FC<Partial<ICart>> = ({
  thumnail,
  medicine_item,
  totalItems,
  totalPrice,
}) => {
  return (
    <>
      {" "}
      <div className="flex items-start gap-4">
        <img className="w-16 sm:w-20" src={thumnail} alt="" />
        <div>
          <p className="text-xs sm:text-lg font-medium">
            {medicine_item?.name}
          </p>
          <div className="flex items-center gap-5 mt-2">
            {/* <p>{{medicine_item?.price}.toLocaleString()} VND</p> */}
            <p>{medicine_item?.price} VND</p>
            {/* <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
              {item.size}
            </p> */}
          </div>
        </div>
      </div>
      <div className="flex items-start gap-1">
        <img
          src="/icon/icon_minus.png"
          alt="icon minus"
          width={24}
          height={24}
        />
        <input
          className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 mr-2"
          type="number"
          min={1}
          defaultValue={item.quantity}
          disabled
        />{" "}
        <img src="/icon/icon_plus.png" alt="icon plus" width={24} height={24} />
      </div>
      <div className="flex flex-row">
        <p className="mr-5">300.000VND</p>{" "}
        <img
          className="w-6 mr-4 sm:w-5 opacity-30"
          src="/icon/icon_trash.png"
          alt="delete"
        />
      </div>
    </>
  );
};
export default CartTab;
