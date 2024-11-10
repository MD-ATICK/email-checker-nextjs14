import PricingCo from "@/app/(main)/pricing/PricingCo";

export default async function PricingPage() {

    return (
        <div className=" p-[1.5vw] space-y-5">
            <div className=" flex items-center justify-between">
                <div className="flex-1">
                    <h1 className=" text-xl font-bold">Choose your plan</h1>
                    <p className=" text-muted-foreground text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum maxime quos libero vel magni cupiditate.</p>
                </div>
            </div>
            <PricingCo route="USER"/>
        </div>
    )
}
