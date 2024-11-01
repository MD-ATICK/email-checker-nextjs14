import EmailCheckerField from "@/components/EmailCheckerField";
import HowToUse from "@/components/HowToUse";
import HowToVerify from "@/components/HowToVerify";
import RocksWhy from "@/components/RocksWhy";

export default function Home() {
  return (
    <div>

      {/* Email Checker box */}
      <div className=" h-[calc(100vh-100px)] flex flex-col w-[50%] mx-auto gap-16  justify-center items-center">
        <div className=" space-y-4  text-center">
          <h2 className=" font-bold text-5xl leading-[55px]"> <span className=" text-primary">Verify any email address</span> {" "} with complete email checker.</h2>
          <p className=" text-sm text-muted-foreground">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint sapiente eveniet recusandae provident placeat praesentium repudiandae harum nesciunt perspiciatis totam atque officiis distinctio adipisci quod nemo natus, corrupti ipsa culpa?</p>
        </div>
        <EmailCheckerField />
      </div>

      {/* How to use */}
      <HowToUse />

      {/* Why rock */}
      <RocksWhy />


      {/* how to verify */}
      <HowToVerify />
    </div>
  );
}
