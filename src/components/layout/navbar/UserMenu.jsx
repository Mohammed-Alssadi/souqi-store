import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogOut, Settings, ClipboardList, User } from "lucide-react";
import { toast } from "sonner";

import { useAuthStore } from "../../../features/auth/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
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
      <Link
        to="/login"
        className="hidden md:flex items-center gap-2 px-5 py-1.5 text-sm font-bold text-white bg-primary rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
      >
        <User size={18} />
        {t('navbar.login')}
      </Link>
    );
  }

  const firstName = user.user_metadata?.first_name || "";
  const lastName = user.user_metadata?.last_name || "";
  const fullName = firstName || lastName ? `${firstName} ${lastName}`.trim() : user.email?.split("@")[0] || "";
  const initials = firstName && lastName
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()
    : fullName.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex outline-none items-center justify-center h-10 w-10 rounded-full border border-border hover:border-primary/50 transition-colors focus-visible:ring-2 focus-visible:ring-primary">
        <Avatar className="h-9 w-9">
          <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={firstName} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-2 z-[100]">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
          <Link to="#" className="w-full flex items-center gap-2.5">
            <ClipboardList size={16} className="text-muted-foreground" />
            <span>{t('navbar.myOrders', 'My Orders')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
          <Link to="#" className="w-full flex items-center gap-2.5">
            <Settings size={16} className="text-muted-foreground" />
            <span>{t('navbar.settings', 'Account Settings')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleSignOut} 
          className="text-destructive focus:bg-destructive/10 focus:text-destructive rounded-xl cursor-pointer flex items-center gap-2.5 font-semibold"
        >
          <LogOut size={16} />
          <span>{t('navbar.signOut', 'Sign Out')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
