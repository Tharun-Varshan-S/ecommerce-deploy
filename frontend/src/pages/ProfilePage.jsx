import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Button, Card } from "../components/ui";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Card className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { label: "Name", value: user.name },
          { label: "Email", value: user.email },
          { label: "Role", value: user.isAdmin ? "Admin" : "Customer" },
          { label: "Joined", value: new Date(user.createdAt).toLocaleDateString() },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 p-4"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className="font-semibold text-slate-900 dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/orders">
          <Button>View Orders</Button>
        </Link>
        {user.isAdmin && (
          <Link to="/admin">
            <Button variant="outline">Open Admin Dashboard</Button>
          </Link>
        )}
      </div>
    </Card>
  );
};

export default ProfilePage;
