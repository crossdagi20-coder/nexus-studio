import { PublicLayout } from "@/components/layout/PublicLayout";

export default function Terms() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>Last updated: December 30, 2024</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
          <p>By accessing our services, you agree to be bound by these terms and conditions.</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8">2. Services</h2>
          <p>Gnexus provides digital agency services including web development, 3D visualization, graphic design, and social media management.</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8">3. Intellectual Property</h2>
          <p>All content and deliverables remain our property until full payment is received.</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8">4. Limitation of Liability</h2>
          <p>We are not liable for indirect, incidental, or consequential damages arising from use of our services.</p>
        </div>
      </div>
    </PublicLayout>
  );
}
