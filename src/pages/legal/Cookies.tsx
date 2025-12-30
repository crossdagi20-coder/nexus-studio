import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollReveal, TextReveal } from "@/components/animations";

export default function Cookies() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-8">
          <TextReveal className="font-serif text-4xl md:text-5xl font-bold">
            Cookie Policy
          </TextReveal>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <ScrollReveal variant="fadeIn" delay={0.2}>
            <p>Last updated: December 30, 2024</p>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <h2 className="text-2xl font-semibold text-foreground mt-8">1. What Are Cookies</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.35}>
            <p>Cookies are small text files stored on your device when you visit our website.</p>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.4}>
            <h2 className="text-2xl font-semibold text-foreground mt-8">2. How We Use Cookies</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.45}>
            <p>We use cookies to analyze site traffic, remember preferences, and improve user experience.</p>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.5}>
            <h2 className="text-2xl font-semibold text-foreground mt-8">3. Managing Cookies</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.55}>
            <p>You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.6}>
            <h2 className="text-2xl font-semibold text-foreground mt-8">4. Contact</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.65}>
            <p>Questions about our cookie policy? Email us at privacy@gnexus.agency.</p>
          </ScrollReveal>
        </div>
      </div>
    </PublicLayout>
  );
}