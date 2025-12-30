import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Palette, 
  Brush, 
  FileImage, 
  Layout, 
  Shapes,
  ArrowRight,
  Sparkles,
  PenTool
} from "lucide-react";

const services = [
  {
    icon: Shapes,
    title: "Brand Identity",
    description: "Complete brand systems including logos, color palettes, typography, and brand guidelines."
  },
  {
    icon: Layout,
    title: "Print Design",
    description: "Eye-catching brochures, business cards, posters, and marketing collateral."
  },
  {
    icon: FileImage,
    title: "Digital Graphics",
    description: "Social media graphics, web banners, email templates, and digital ads."
  },
  {
    icon: PenTool,
    title: "Illustration",
    description: "Custom illustrations, icons, and infographics that tell your story."
  }
];

const portfolio = [
  { title: "Brand Refresh", category: "Branding" },
  { title: "Marketing Campaign", category: "Digital" },
  { title: "Product Packaging", category: "Print" },
  { title: "Icon Set Design", category: "Illustration" }
];

export default function GraphicDesign() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-40 left-40 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Brush className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-500">Graphic Design</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Design That
              <span className="text-gradient"> Captivates </span>
              & Converts
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              From bold brand identities to stunning marketing materials, 
              we create designs that make lasting impressions and drive action.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="pillowy gap-2">
                  Start Designing <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="pillowy-ghost">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Design Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Creative solutions for every touchpoint of your brand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 group hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl font-bold mb-4">Recent Work</h2>
            <p className="text-muted-foreground">A glimpse of our creative projects</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolio.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square glass-card p-6 flex flex-col justify-end group cursor-pointer hover:border-amber-500/30 transition-all"
              >
                <Palette className="w-8 h-8 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/portfolio">
              <Button variant="outline" className="pillowy-ghost gap-2">
                View All Projects <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center max-w-3xl mx-auto"
          >
            <Sparkles className="w-16 h-16 text-amber-500 mx-auto mb-6" />
            <h2 className="font-serif text-4xl font-bold mb-4">Ready to Stand Out?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's create designs that elevate your brand.
            </p>
            <Link to="/contact">
              <Button size="lg" className="pillowy gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
