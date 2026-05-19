import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { Button, Card, Input } from "../components/ui";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form);
      navigate(location.state?.from || "/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Login</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          minLength={6}
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
        />
        <Button disabled={submitting} className="w-full">
          {submitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        New here?{" "}
        <Link to="/register" className="font-semibold text-violet-500">
          Create account
        </Link>
      </p>
    </Card>
  );
};

export default LoginPage;
