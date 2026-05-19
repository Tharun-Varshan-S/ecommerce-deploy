import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { Button, Card, Input } from "../components/ui";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(form);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Account</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          type="text"
          placeholder="Full name"
          required
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        />
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
          {submitting ? "Creating..." : "Create Account"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        Already registered?{" "}
        <Link to="/login" className="font-semibold text-violet-500">
          Login
        </Link>
      </p>
    </Card>
  );
};

export default RegisterPage;
