import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { loginUser } from '@/features/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}



export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error])

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful!");
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);



  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    dispatch(loginUser(data))
  };

  return (

    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required {...register("email", { required: "Email is Required" })} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message as String}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required {...register("password", { required: "Password is Required" })} />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message as String}</p>
              )}
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
