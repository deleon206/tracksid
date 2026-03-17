import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Demos = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[57px]">
        <iframe
          src="https://www.labelradar.com/labels/denar/portal"
          width="100%"
          frameBorder="0"
          className="w-full"
          style={{ height: "calc(100vh - 57px)" }}
          title="Demos Portal"
        />
      </main>
    </div>
  );
};

export default Demos;
