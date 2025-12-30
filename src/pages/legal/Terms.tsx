import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollReveal, TextReveal } from "@/components/animations";

export default function Terms() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-8">
          <TextReveal className="font-serif text-4xl md:text-5xl font-bold">
            Terms of Service
          </TextReveal>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <ScrollReveal variant="fadeIn" delay={0.2}>
            <p>Last updated: December 30, 2024</p>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <h2 className="text-2xl font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.35}>
            <p>By accessing our services, you agree to be bound by these terms and conditions.</p>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.4}>
            <h2 className="text-2xl font-semibold text-foreground mt-8">2. Services</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.45}>
            <p>Gnexus provides digital agency services including web development, 3D visualization, graphic design, and social media management.</p>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.5}>
            <h2 className="text-2xl font-semibold text-foreground mt-8">3. Intellectual Property</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.55}>
            <p>All content and deliverables remain our property until full payment is received.</p>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.6}>
            <h2 className="text-2xl font-semibold text-foreground mt-8">4. Limitation of Liability</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.65}>
            <p>We are not liable for indirect, incidental, or consequential damages arising from use of our services.</p>
          </ScrollReveal>
        </div>
      </div>
    </PublicLayout>
  );
}