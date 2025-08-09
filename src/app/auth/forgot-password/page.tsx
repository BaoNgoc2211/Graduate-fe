"use client"
import { useSearchParams } from "next/navigation";
import { 
  ChevronLeft, 
  Mail, 
  AlertCircle, 
  CheckCircle2,
  Loader2,
  Shield
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForgotPassword } from "@/hooks/auth.hook";
const EmailInput = ({ 
  value, 
  onChange, 
  error, 
  disabled 
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Nhập email
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className={`h-5 w-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
        </div>
        <input
          id="email"
          type="email"
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            block w-full pl-10 pr-3 py-3 border rounded-lg text-sm
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }
          `}
          placeholder="Nhập email của bạn vào đây nhé"
          autoComplete="email"
          autoFocus
        />
      </div>
      {error && (
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Success State Component
const SuccessState = ({ email, onResend, isResending }: {
  email: string;
  onResend: () => void;
  isResending: boolean;
}) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    onResend();
    setCountdown(60);
    setCanResend(false);
  };

  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Kiểm tra email</h2>
        <p className="text-gray-600 max-w-sm mx-auto">
          Chúng tôi đã gửi một OTP dến{" "}
          <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-left">
            <p className="text-sm font-medium text-blue-900">Security tip</p>
            <p className="text-sm text-blue-700">
              The code will expire in 10 minutes. Check your spam folder if you don&apos;t see it.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link 
          href={`/auth/reset-password?email=${encodeURIComponent(email)}`}
          className="inline-flex w-full justify-center items-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Nhập OTP để đặt lại mật khẩu
        </Link>

        <button
          onClick={handleResend}
          disabled={!canResend || isResending}
          className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isResending ? (
            <span className="flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Đang gửi...</span>
            </span>
          ) : canResend ? (
            "Didn&apos;t receive the email? Gửi lại"
          ) : (
            `Rửi laị OTP trong ${countdown}s`
          )}
        </button>
      </div>
    </div>
  );
};

// Main Component
const ForgotPassword = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Use the custom hook
  const forgotPasswordMutation = useForgotPassword();
  const resendMutation = useForgotPassword();

  // Get email from URL params if available
  useEffect(() => {
    const emailFromParams = searchParams.get('email');
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [searchParams]);

  // Email validation
  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    return "";
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    setEmailError(error);
    
    if (!error) {
      forgotPasswordMutation.mutate(
        { email: email.trim() },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          // onError: () => {
          //   // Handle specific error cases
          //   if (error?.status === 404) {
          //     setEmailError("No account found with this email address");
          //   }
          // },
          onError: () => {
            setEmailError("Đặt lại mật khẩu thất bại. Vui lòng thử lại sau.");
          }
        }
      );
    }
  };

  // Handle email input change
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) {
      setEmailError("");
    }
  };

  // Handle resend
  const handleResend = () => {
    resendMutation.mutate({ email: email.trim() });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10">
          {!isSuccess ? (
            // Form State
            <>
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Bạn bị quên mật khẩu?
                  </h2>
                  <p className="text-gray-600 max-w-sm mx-auto">
                    Đừng lo lắng! Nhập email của bạn và chúng tôi &apos; sẽ gửi mã OTP cho bạn.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <EmailInput
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                    disabled={forgotPasswordMutation.isPending}
                  />

                  <button
                    type="submit"
                    disabled={forgotPasswordMutation.isPending}
                    className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {forgotPasswordMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Đang gửi OTP bạn chờ xíu nhé...
                      </>
                    ) : (
                      "Send reset code"
                    )}
                  </button>
                </form>
              </div>

              {/* Back to login */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link 
                  href="/auth"
                  className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Quay lại trang đăng nhập
                </Link>
              </div>
            </>
          ) : (
            // Success State
            <SuccessState 
              email={email}
              onResend={handleResend}
              isResending={resendMutation.isPending}
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Cần hỗ trợ?{" "}
            <Link href="/support" className="text-blue-600 hover:text-blue-500">
              Thông tin hỗ trỡ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;