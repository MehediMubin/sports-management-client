const SalesCard = ({
   Title,
   description,
}: {
   Title: string;
   description: string | number;
}) => {
   return (
      <div className="card w-96 bg-primary text-primary-content">
         <div className="card-body">
            <h2 className="card-title font-bold tracking-wide">{Title}</h2>
            <p className="text-2xl font-bold">{description}</p>
         </div>
      </div>
   );
};

export default SalesCard;
