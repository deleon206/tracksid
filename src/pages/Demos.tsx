import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Demos = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl md:text-4xl font-heading text-foreground mb-6 text-center">
          Demos
        </h1>
        <div className="w-full max-w-5xl rounded-sm overflow-hidden border border-border">
          <iframe
            src="https://www.labelradar.com/labels/denar/portal"
            width="100%"
            frameBorder="0"
            style={{ height: "80vh" }}
            title="Demos Portal"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Demos;
