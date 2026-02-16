import React, { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

function SafeHeader() {
  try {
    const { SiteHeader } = require("@/components/ui/site-header");
    return <SiteHeader />;
  } catch {
    return (
      <header className="bg-black py-4 px-6">
        <div className="container mx-auto">
          <span className="text-[#8dc63f] font-bold text-xl">Greenfoot Energy</span>
        </div>
      </header>
    );
  }
}

function SafeFooter() {
  try {
    const { SiteFooter } = require("@/components/ui/site-footer");
    return <SiteFooter />;
  } catch {
    return (
      <footer className="bg-black text-white py-8 px-6">
        <div className="container mx-auto text-center">
          <span className="text-slate-400">© {new Date().getFullYear()} Greenfoot Energy Solutions</span>
        </div>
      </footer>
    );
  }
}

function ErrorFallbackUI() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SafeHeader />
      
      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-[#8dc63f]/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-[#8dc63f]" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">
              Something Went Wrong
            </h1>

            <p className="text-lg text-slate-600 mb-8">
              We're sorry, something unexpected happened. Please try reloading the page or go back to the homepage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleReload}
                className="bg-[#8dc63f] hover:bg-[#7ab52f] text-white rounded-xl px-6 py-3 text-lg font-semibold inline-flex items-center gap-2"
                data-testid="button-reload-page"
              >
                <RefreshCw className="w-5 h-5" />
                Reload Page
              </Button>
              <Link href="/">
                <Button 
                  variant="outline" 
                  className="border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f] hover:text-white rounded-xl px-6 py-3 text-lg font-semibold inline-flex items-center gap-2 w-full sm:w-auto"
                  data-testid="button-go-home"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-slate-500">
              If this problem persists, please{" "}
              <a 
                href="tel:1-888-447-3364" 
                className="text-[#8dc63f] hover:underline font-medium"
              >
                contact us
              </a>{" "}
              for assistance.
            </p>
          </div>
        </div>
      </main>

      <SafeFooter />
    </div>
  );
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error);
    console.error("Error info:", errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <ErrorFallbackUI />;
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithErrorBoundary = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;

  return ComponentWithErrorBoundary;
}

export default ErrorBoundary;
