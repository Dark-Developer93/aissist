import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using AIssist, you agree to be bound by these Terms
            of Service.
          </p>

          <h2 className="text-2xl font-bold mb-4">2. Use of Service</h2>
          <p className="mb-4">
            You agree to use AIssist only for lawful purposes and in accordance
            with these Terms.
          </p>

          {/* Add more sections as needed */}
        </CardContent>
      </Card>
    </div>
  );
}
