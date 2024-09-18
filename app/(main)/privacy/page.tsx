import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us when using
            AIssist.
          </p>

          <h2 className="text-2xl font-bold mb-4">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve
            our services.
          </p>

          {/* Add more sections as needed */}
        </CardContent>
      </Card>
    </div>
  );
}
