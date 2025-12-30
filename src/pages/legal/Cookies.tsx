import { PublicLayout } from "@/components/layout/PublicLayout";

export default function Cookies() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8">Cookie Policy</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>Last updated: December 30, 2024</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8">1. What Are Cookies</h2>
          <p>Cookies are small text files stored on your device when you visit our website.</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8">2. How We Use Cookies</h2>
          <p>We use cookies to analyze site traffic, remember preferences, and improve user experience.</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8">3. Managing Cookies</h2>
          <p>You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8">4. Contact</h2>
          <p>Questions about our cookie policy? Email us at privacy@gnexus.agency.</p>
        </div>
      </div>
    </PublicLayout>
  );
}
