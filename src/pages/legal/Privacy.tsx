import { PublicLayout } from "@/components/layout/PublicLayout";

export default function Privacy() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>Last updated: December 30, 2024</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
          <p>We collect information you provide directly, including name, email, and project details when you contact us or use our services.</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
          <p>We use collected information to provide services, communicate with you, and improve our offerings.</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8">3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information.</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8">4. Contact Us</h2>
          <p>For questions about this policy, contact us at privacy@gnexus.agency.</p>
        </div>
      </div>
    </PublicLayout>
  );
}
