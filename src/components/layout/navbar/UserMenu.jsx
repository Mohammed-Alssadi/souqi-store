import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogOut, Settings, ClipboardList, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { useAuthStore } from "../../../features/auth/store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

export default function UserMenu() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success(t('auth.signOutSuccess', 'Successfully signed out.'));
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error(t('auth.signOutError', 'Failed to sign out. Please try again.'));
    }
  };

  if (!user) {
    return (
      <Button asChild className="hidden md:flex rounded-full shadow-md hover:shadow-lg font-bold px-5 dark:text-zinc-300 ">
        <Link to="/login">
          <User size={18} className="me-2" />
          {t('navbar.login')}
        </Link>
      </Button>
    );
  }

  const firstName = user.user_metadata?.first_name || "";
  const lastName = user.user_metadata?.last_name || "";
  const fullName = firstName || lastName ? `${firstName} ${lastName}`.trim() : user.email?.split("@")[0] || "";
  const initials = firstName && lastName
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()
    : fullName.slice(0, 2).toUpperCase();

  return (
    <Sheet>
      <SheetTrigger className="flex outline-none items-center justify-center h-8 w-8 rounded-full border border-border hover:border-primary/50 transition-colors focus-visible:ring-2 focus-visible:ring-primary">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={firstName} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">{initials}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side="end" className="w-[85vw] max-w-sm sm:max-w-sm p-6 flex flex-col h-full bg-background border-none shadow-2xl">
        <SheetHeader className="pb-6 mb-2 border-b border-border text-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={firstName} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-start overflow-hidden">
              <SheetTitle className="text-xl font-bold truncate w-full">{fullName}</SheetTitle>
              <p className="text-sm text-muted-foreground truncate w-full">{user.email}</p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-2 mt-4">
          <Button variant="ghost" asChild className="w-full justify-start text-base h-14 rounded-xl px-4 hover:bg-secondary/60">
            <Link to="#">
              <ClipboardList size={22} className="me-3 text-primary" />
              <span className="font-medium">{t('navbar.myOrders', 'My Orders')}</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild className="w-full justify-start text-base h-14 rounded-xl px-4 hover:bg-secondary/60">
            <Link to="#">
              <Settings size={22} className="me-3 text-primary" />
              <span className="font-medium">{t('navbar.settings', 'Account Settings')}</span>
            </Link>
          </Button>
        </div>

        <div className="mt-auto pt-6 border-t border-border">
          <Button 
            variant="destructive" 
            onClick={handleSignOut} 
            className="w-full h-14 rounded-xl font-bold text-base shadow-md hover:shadow-lg"
          >
            <LogOut size={20} className="me-2" />
            {t('navbar.signOut', 'Sign Out')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
