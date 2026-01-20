import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, Activity, Heart, Zap, Brain, Bone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
const { GET, POST, PUT, DELETE: DEL } = await import("../../lib/request.js");
const { API } = await import("../../lib/endpoints.js");


export function FeaturedTests() {

  const [tests, setTests] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchTests = async () => {
    try {
      const data = await GET(API.TESTS.RANDOM);
      setTests(data || []);
    } catch (err) {
      toast({ title: "Error", description: "Could not fetch tests", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Popular <span className="text-gradient">Tests</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Most booked diagnostic tests with accurate results and affordable pricing
            </p>
          </div>
          <Link to="/tests">
            <Button variant="ghost" className="group">
              View All Tests
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test, index) => (
            <div
              key={test.id}
              className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {test.category_name}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {test.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {test.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span className="font-medium text-foreground">25</span> parameters included
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <span className="text-2xl font-bold text-foreground">₹{test.price}</span>
                  <span className="text-sm text-muted-foreground line-through ml-2">₹{test.originalPrice}</span>
                </div>
                <Link to={`/tests/${test.id}`}>
                  <Button size="sm">Book Now</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
