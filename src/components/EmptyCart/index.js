import Image from "next/image";

const EmptyCart = () => {
  return (
    <div className="w-full p-5 empty gap-4 ">
      <Image
        className="h-[340px]"
        height={500}
        width={500}
        src="/assets/img/emptyCart.svg"
        alt="empty cart"
      />
      <h2 className="text-textColor  font-semibold">Cart is empty</h2>
    </div>
  );
};

export default EmptyCart;
