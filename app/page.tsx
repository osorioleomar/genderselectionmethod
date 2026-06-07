import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";
import Wizard from "@/components/wizard/Wizard";
import EducationalTabs from "@/components/education/EducationalTabs";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Wizard />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Disclaimer />
          <EducationalTabs />
        </div>
      </main>
      <Footer />
    </>
  );
}
