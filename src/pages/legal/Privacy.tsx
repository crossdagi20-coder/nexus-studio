import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollReveal, TextReveal } from "@/components/animations";

export default function Privacy() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-8">
          <TextReveal className="font-serif text-4xl md:text-5xl font-bold">
            Privacy Policy
          </TextReveal>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <ScrollReveal variant="fadeIn" delay={0.2}>
            <p>Last updated: December 30, 2024</p>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <h2 className="text-2xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.35}>
            <p>We collect information you provide directly, including name, email, and project details when you contact us or use our services.</p>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.4}>
            <h2 className="text-2xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.45}>
            <p>We use collected information to provide services, communicate with you, and improve our offerings.</p>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.5}>
            <h2 className="text-2xl font-semibold text-foreground mt-8">3. Data Security</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.55}>
            <p>We implement industry-standard security measures to protect your personal information.</p>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.6}>
            <h2 className="text-2xl font-semibold text-foreground mt-8">4. Contact Us</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.65}>
            <p>For questions about this policy, contact us at privacy@gnexus.agency.</p>
          </ScrollReveal>
        </div>
      </div>
    </PublicLayout>
  );
}