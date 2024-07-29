import React from "react";


const TempPage = () => {
  const product = {
    _id: "6685171922ec8e528338e0ea",
    name: "IQoo neo 6",
    description: "this is a iqoo phone",
    price: "25455",
    ratings: "4.2",
    category: "Phone",
    stock: "18",
    noOfReviews: "1",
    creator: "6683b5da459c591eb0c66403",
    images: [
      {
        public_url:
          "https://images.pexels.com/photos/9048174/pexels-photo-9048174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        public_url:
          "https://images.pexels.com/photos/26987191/pexels-photo-26987191/free-photo-of-processed-with-vsco-with-m5-preset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        public_url:
          "https://images.pexels.com/photos/18133948/pexels-photo-18133948/free-photo-of-portrait-of-woman-in-traditional-clothing-and-hat.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    reviews: [
      {
        user: "668504a7f11f319d24194eb3",
        name: "Anshu",
        rating: "4.2",
        comment: "Mid phone by anshu",
        _id: "6686394156e279a151b08fa7",
      },
    ],
    createdAt: "1719998233387",
    updatedAt: "1720086975101",
    __v: "3",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-6 gap-6">
      <div className="flex items-center justify-center border-2 p-4 rounded-lg">
        <div className="carousel w-full">
          {product.images && product.images.map((image, index) => (
            <img key={index} src={image.public_url} alt={`Product ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default TempPage;
