import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Clock, CheckCircle, XCircle, Star, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import slackIcon from "@/assets/slack-icon.png";
import teamsIcon from "@/assets/teams-icon.png";
import salesforceIcon from "@/assets/salesforce-icon.png";
import jiraIcon from "@/assets/jira-icon.png";

const iconMap: { [key: string]: string } = {
  slack: slackIcon,
  teams: teamsIcon,
  salesforce: salesforceIcon,
  jira: jiraIcon,
};

// Sample data
const myApps = [
  {
    id: "slack",
    name: "Slack",
    description: "Team communication platform",
    lastUsed: "2 hours ago",
    icon: "slack",
    usage: "Daily"
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Customer relationship management",
    lastUsed: "1 day ago",
    icon: "salesforce",
    usage: "Weekly"
  }
];

const pendingRequests = [
  {
    id: "teams",
    name: "Microsoft Teams",
    description: "Video conferencing platform",
    requestDate: "2024-03-20",
    status: "pending",
    urgency: "medium",
    icon: "teams"
  },
  {
    id: "jira",
    name: "Jira",
    description: "Project management tool",
    requestDate: "2024-03-18",
    status: "approved",
    urgency: "high",
    icon: "jira"
  }
];

const recommendedApps = [
  {
    id: "figma",
    name: "Figma",
    description: "Design and prototyping tool",
    reason: "Popular with Design team",
    rating: 4.9,
    icon: "figma"
  },
  {
    id: "notion",
    name: "Notion",
    description: "Workspace for notes and docs",
    reason: "Based on your role",
    rating: 4.7,
    icon: "notion"
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("my-apps");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case "approved":
        return <Badge variant="success" className="gap-1"><CheckCircle className="h-3 w-3" />Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Catalog
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-semibold">My Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your applications and requests</p>
              </div>
            </div>
            
            <Link to="/">
              <Button variant="outline">
                <Grid3X3 className="h-4 w-4 mr-2" />
                Browse Catalog
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{myApps.length}</div>
              <p className="text-sm text-muted-foreground">Active Apps</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">{pendingRequests.filter(r => r.status === "pending").length}</div>
              <p className="text-sm text-muted-foreground">Pending Requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">{pendingRequests.filter(r => r.status === "approved").length}</div>
              <p className="text-sm text-muted-foreground">Approved This Month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary">{recommendedApps.length}</div>
              <p className="text-sm text-muted-foreground">Recommendations</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="my-apps">My Apps</TabsTrigger>
            <TabsTrigger value="pending-requests">Pending Requests</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="my-apps" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">My Applications ({myApps.length})</h2>
              </div>
              
              {myApps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myApps.map((app) => (
                    <Card key={app.id} className="hover:shadow-medium transition-smooth">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12 rounded-xl">
                            <AvatarImage src={iconMap[app.icon]} alt={app.name} />
                            <AvatarFallback className="rounded-xl bg-primary text-primary-foreground">
                              {app.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground">{app.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{app.description}</p>
                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                              <span>Last used: {app.lastUsed}</span>
                              <Badge variant="outline" className="text-xs">{app.usage}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" className="flex-1">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Open
                          </Button>
                          <Link to={`/app/${app.id}`}>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CardContent>
                    <p className="text-muted-foreground mb-4">You don't have any active applications yet.</p>
                    <Link to="/">
                      <Button>Browse App Catalog</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="pending-requests" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Pending Requests ({pendingRequests.length})</h2>
              </div>
              
              {pendingRequests.length > 0 ? (
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <Card key={request.id} className="hover:shadow-medium transition-smooth">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 rounded-xl">
                            <AvatarImage src={iconMap[request.icon]} alt={request.name} />
                            <AvatarFallback className="rounded-xl bg-primary text-primary-foreground">
                              {request.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-foreground">{request.name}</h3>
                                <p className="text-sm text-muted-foreground">{request.description}</p>
                                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                                  <span>Requested: {request.requestDate}</span>
                                  <span className={`font-medium ${getUrgencyColor(request.urgency)}`}>
                                    {request.urgency.toUpperCase()} PRIORITY
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {getStatusBadge(request.status)}
                                <Link to={`/app/${request.id}`}>
                                  <Button variant="outline" size="sm">
                                    View App
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CardContent>
                    <p className="text-muted-foreground mb-4">No pending requests.</p>
                    <Link to="/">
                      <Button>Request New App</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="recommended" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recommended for You ({recommendedApps.length})</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedApps.map((app) => (
                  <Card key={app.id} className="hover:shadow-medium transition-smooth">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12 rounded-xl">
                          <AvatarFallback className="rounded-xl bg-secondary text-secondary-foreground">
                            {app.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground">{app.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{app.description}</p>
                          <div className="mt-2 flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{app.reason}</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-current text-yellow-500" />
                              <span className="font-medium">{app.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Link to={`/app/${app.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            View Details
                          </Button>
                        </Link>
                        <Link to={`/request-access/${app.id}`} className="flex-1">
                          <Button size="sm" className="w-full">
                            Request Access
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;