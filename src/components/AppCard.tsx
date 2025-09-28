import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import slackIcon from "@/assets/slack-icon.png";
import teamsIcon from "@/assets/teams-icon.png";
import salesforceIcon from "@/assets/salesforce-icon.png";
import jiraIcon from "@/assets/jira-icon.png";

interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  status: "Available" | "Request Access";
  featured?: boolean;
  popular?: boolean;
  icon: string;
}

interface AppCardProps {
  app: App;
  layout?: "grid" | "list";
}

const iconMap: { [key: string]: string } = {
  "/src/assets/slack-icon.png": slackIcon,
  "/src/assets/teams-icon.png": teamsIcon,
  "/src/assets/salesforce-icon.png": salesforceIcon,
  "/src/assets/jira-icon.png": jiraIcon,
};

export function AppCard({ app, layout = "grid" }: AppCardProps) {
  const getStatusVariant = (status: string) => {
    return status === "Available" ? "success" : "secondary";
  };

  const getStatusColor = (status: string) => {
    return status === "Available" ? "text-success" : "text-muted-foreground";
  };

  if (layout === "list") {
    return (
      <Card className="hover:shadow-medium transition-smooth cursor-pointer group">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 rounded-xl">
              <AvatarImage src={iconMap[app.icon]} alt={app.name} />
              <AvatarFallback className="rounded-xl bg-primary text-primary-foreground">
                {app.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {app.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span>{app.rating}</span>
                      <span>({app.reviews})</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {app.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Badge variant={getStatusVariant(app.status)} className="text-xs">
                    {app.status}
                  </Badge>
                  <Link to={`/app/${app.id}`}>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-medium transition-smooth cursor-pointer group overflow-hidden">
      <Link to={`/app/${app.id}`} className="block">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between">
            <Avatar className="h-12 w-12 rounded-xl shadow-soft">
              <AvatarImage src={iconMap[app.icon]} alt={app.name} />
              <AvatarFallback className="rounded-xl bg-primary text-primary-foreground">
                {app.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col items-end gap-1">
              {app.featured && (
                <Badge variant="default" className="text-xs">
                  Featured
                </Badge>
              )}
              <Badge variant={getStatusVariant(app.status)} className="text-xs">
                {app.status}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-1">
            <CardTitle className="text-base group-hover:text-primary transition-colors">
              {app.name}
            </CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {app.description}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current text-yellow-500" />
              <span className="font-medium">{app.rating}</span>
              <span className="text-muted-foreground">({app.reviews})</span>
            </div>
            
            <Badge variant="outline" className="text-xs">
              {app.category}
            </Badge>
          </div>
          
          <Button
            variant={app.status === "Available" ? "default" : "secondary"}
            size="sm"
            className="w-full"
          >
            {app.status === "Available" ? "Open App" : "Request Access"}
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}