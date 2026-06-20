"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "~/components/ui/card";
import {
  Map,
  MapPin,
  User,
  MessageSquare,
  Handshake,
  Megaphone,
  HelpCircle,
  Briefcase,
  Calculator,
  Clock,
  Home,
  Key,
  Shield,
  Star,
  Phone,
  Mail,
  Camera,
  Heart,
  Award,
  Search,
  TrendingUp,
  Sparkles,
  BadgeCheck,
  Hammer,
  Building,
  Scale,
} from "lucide-react";
import { staggerContainer, staggerItem } from "~/lib/animations";

interface Service {
  title: string;
  icon: string;
}

interface ServicesGridProps {
  services: Service[];
  title: string;
  maxServicesDisplayed: number;
}

const iconComponents = {
  map: Map,
  "map-pin": MapPin,
  user: User,
  "message-square": MessageSquare,
  handshake: Handshake,
  megaphone: Megaphone,
  "help-circle": HelpCircle,
  briefcase: Briefcase,
  calculator: Calculator,
  clock: Clock,
  home: Home,
  key: Key,
  shield: Shield,
  star: Star,
  phone: Phone,
  mail: Mail,
  camera: Camera,
  heart: Heart,
  award: Award,
  search: Search,
  "trending-up": TrendingUp,
  sparkles: Sparkles,
  "badge-check": BadgeCheck,
  hammer: Hammer,
  building: Building,
  scale: Scale,
};

const getIconComponent = (icon?: string) => {
  if (!icon) return HelpCircle;
  const normalizedIcon = icon.trim().toLowerCase();
  return (
    iconComponents[normalizedIcon as keyof typeof iconComponents] ?? HelpCircle
  );
};

function IconCard({ title, icon }: Service) {
  const IconComponent = getIconComponent(icon);
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <Card className="h-full border border-border/60 bg-transparent shadow-none transition-colors hover:border-foreground/30">
        <CardContent className="flex items-center gap-3 p-4 sm:p-5">
          <div className="flex-shrink-0 rounded-full border border-border/60 p-2">
            <IconComponent className="h-4 w-4 text-foreground/70" />
          </div>
          <span className="text-sm font-medium text-foreground sm:text-base">
            {title}
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CardSection({
  title,
  items,
  max,
}: {
  title: string;
  items: Service[];
  max: number;
}) {
  return (
    <motion.div
      className="space-y-3 sm:space-y-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
        {title}
      </h3>
      <motion.div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.slice(0, max).map((item, index) => (
          <IconCard key={index} title={item.title} icon={item.icon} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export function ServicesGrid({
  services,
  title,
  maxServicesDisplayed,
}: ServicesGridProps) {
  return (
    <CardSection title={title} items={services} max={maxServicesDisplayed} />
  );
}
