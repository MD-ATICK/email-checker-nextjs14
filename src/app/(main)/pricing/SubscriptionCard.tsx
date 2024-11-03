import { formatIndianCurrency } from "@/lib/utils";
import { Volume } from "@prisma/client";
import BuyNowButton from "./BuyNowButton";

export default function SubscriptionCard({ subscription }: { subscription: Volume }) {

    return (
        <div className=" p-6 bg-secondary space-y-1 text-center rounded-xl">
            <h1 className=" font-bold text-3xl">{formatIndianCurrency(subscription?.dailyCredit || 0)}</h1>
            <p className="  text-muted-foreground">emails / day</p>
            <h1 className=" font-bold text-2xl">${formatIndianCurrency(subscription.amount)}</h1>
            <br />
            <BuyNowButton volumeId={subscription.id} type={subscription.type} />
        </div>
    )
}
