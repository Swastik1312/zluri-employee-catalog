import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
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

const appNames: { [key: string]: string } = {
  slack: "Slack",
  teams: "Microsoft Teams", 
  salesforce: "Salesforce",
  jira: "Jira",
};

const RequestAccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessJustification: "",
    urgency: "",
    duration: "",
    manager: "",
    additionalNotes: ""
  });

  const appName = appNames[id as keyof typeof appNames] || "Unknown App";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Request Submitted",
        description: `Your access request for ${appName} has been sent for approval.`,
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-lg text-center">
          <CardContent className="pt-8 space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Request Submitted!</h1>
              <p className="text-muted-foreground">
                Your access request for <strong>{appName}</strong> has been sent to your manager and IT admin for approval.
              </p>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="bg-muted rounded-lg p-4 text-left space-y-2">
                <h3 className="font-medium">What happens next?</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Your manager will review your business justification</li>
                  <li>• IT admin will verify security requirements</li>
                  <li>• You'll receive an email with the approval status</li>
                  <li>• Average approval time: 2-3 business days</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link to="/dashboard" className="flex-1">
                <Button className="w-full">
                  View My Requests
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Back to Catalog
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to={`/app/${id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to App
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={iconMap[id as string]} alt={appName} />
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-sm">
                  {appName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">Request Access to {appName}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Request Access</CardTitle>
              <CardDescription>
                Please provide the following information to request access to {appName}. 
                Your request will be reviewed by your manager and IT administrator.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Justification */}
                <div className="space-y-2">
                  <Label htmlFor="justification">
                    Business Justification <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="justification"
                    placeholder="Explain why you need access to this application and how it will help you in your role..."
                    value={formData.businessJustification}
                    onChange={(e) => handleInputChange("businessJustification", e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                {/* Urgency */}
                <div className="space-y-2">
                  <Label htmlFor="urgency">
                    Urgency Level <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Can wait 1-2 weeks</SelectItem>
                      <SelectItem value="medium">Medium - Needed within 1 week</SelectItem>
                      <SelectItem value="high">High - Needed within 2-3 days</SelectItem>
                      <SelectItem value="critical">Critical - Needed immediately</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration">
                    Expected Duration <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="How long do you need access?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temporary">Temporary (&lt; 3 months)</SelectItem>
                      <SelectItem value="project">Project-based (3-12 months)</SelectItem>
                      <SelectItem value="permanent">Permanent (ongoing role requirement)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Manager */}
                <div className="space-y-2">
                  <Label htmlFor="manager">
                    Direct Manager Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="manager"
                    type="email"
                    placeholder="manager@company.com"
                    value={formData.manager}
                    onChange={(e) => handleInputChange("manager", e.target.value)}
                    required
                  />
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information that might be helpful for the approval process..."
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <h4 className="font-medium text-sm">Review Process</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your manager will receive an email notification</li>
                    <li>• IT will review security and compliance requirements</li>
                    <li>• You'll be notified of the decision via email</li>
                    <li>• Typical approval time: 2-3 business days</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1" variant="enterprise">
                    Submit Request
                  </Button>
                  <Link to={`/app/${id}`} className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestAccess;