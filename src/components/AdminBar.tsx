import { useState } from "react";
import { Lock, LogOut, ShieldCheck, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAdmin } from "@/hooks/use-admin";

export function AdminBar() {
  const { isAdmin, hasPassword, setPassword, login, logout } = useAdmin();
  const [open, setOpen] = useState(false);
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (!hasPassword) {
        if (pwd.length < 4) {
          toast.error("Password must be at least 4 characters");
          return;
        }
        if (pwd !== confirm) {
          toast.error("Passwords don't match");
          return;
        }
        await setPassword(pwd);
        toast.success("Admin password set — you're in edit mode");
        setOpen(false);
      } else {
        const ok = await login(pwd);
        if (ok) {
          toast.success("Welcome back, edit mode enabled");
          setOpen(false);
        } else {
          toast.error("Incorrect password");
        }
      }
      setPwd("");
      setConfirm("");
    } finally {
      setBusy(false);
    }
  };

  if (isAdmin) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          logout();
          toast.success("Logged out of edit mode");
        }}
        className="gap-1.5"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        <span className="hidden sm:inline">Editing</span>
        <LogOut className="h-3.5 w-3.5 opacity-60" />
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-1.5 text-muted-foreground"
      >
        <Lock className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Admin</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyRound className="h-4 w-4" />
              {hasPassword ? "Admin Login" : "Set Admin Password"}
            </DialogTitle>
            <DialogDescription>
              {hasPassword
                ? "Enter your password to unlock edit mode."
                : "Create a password to protect your profile from edits."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="pwd">Password</Label>
              <Input
                id="pwd"
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                autoFocus
                required
              />
            </div>
            {!hasPassword && (
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={busy}>
              {hasPassword ? "Unlock" : "Set password & unlock"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
