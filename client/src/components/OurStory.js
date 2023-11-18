import React from "react";
import "./CSS/Opportunities.css";
import opp from "./Images/story.png";

function OurStory() {
  return (
    <div
      className="background-image overflow-scroll"
      style={{ paddingTop: "100px", height: "100vh" }}
    >
      <div className="row p-0">
        <div className="col-md-7 bg-white p-4">
          <div
            className="p-4 text-white"
            style={{ backgroundColor: "#530050" }}
          >
            <small className="Opportunities-text">
              <p>
                Once upon a time in the breathtaking tea country of India a
                vision based on intent was born. An individual, who grew
                passionate for tea and its effects on the mind, body and soul
                brought together a shared purpose of bringing the authentic
                essence of tea to every household across India. Thus, began the
                journey of our premium, hand-picked consumer tea brand, Dirasz.
              </p>

              <p>
                Our brand with its deep roots in Indian culture and heritage is
                dedicated to providing the finest tea experience to tea lovers
                of every kind. From the connoisseurs who seek the perfect brew
                to those who simply enjoy a comforting cup of milk tea. Just
                like we love it here in India. We cater to all tastes and
                preferences.
              </p>

              <p>
                At the heart of our brand lies a commitment to quality, of the
                product, of packaging and also of the whole experience from
                buying to consum- ing our Teas. We meticulously select the
                freshest tea leaves from the abundant tea gardens nestled in the
                verdant landscapes of India. Through our relationship with local
                gardens and tea estates we ensure sustainable cultivation
                practices that not only nurture the environ- ment but also
                contribute to the well-being of the tea-growing communities.
              </p>

              <p>
                Our highly skilled tea experts use traditional knowledge
                combined with modern innovative techniques to create
                unparalleled blends. Each tea variant is carefully crafted to
                offer a symphony of flavors capturing the unique essence and
                character of Indian tea. Whether it's the robust Assam tea the
                fragrant Darjeeling tea the soothing infusion with every sip is
                a journey through India's rich tea heritage. We believe that
                brewing and enjoying a cup of tea is a sacred ritual. Therefore
                we strive to provide a complete tea experience. Our packaging is
                thoughtfully designed to preserve the aroma and freshness of the
                tea leaves ensuring that every cup brewed is as delightful as
                the first. With time and your support we also plan offer a range
                of tea accessories from teapots to tea infusers to enhance the
                brewing process and elevate your tea-drinking experience. But
                our brand is not just about tea- it is about fostering
                connections, moments of togetherness and sharing joy.
              </p>

              <p>
                We envision our brand as a catalyst for conversations and
                celebrations as tea has always been an integral part of India's
                social fabric.
              </p>
              <p>
                From family gatherings to chai breaks with friends, our tea aims
                to create connections and forge cherished memories that last a
                lifetime.
              </p>

              <p>
                {" "}
                As a socially responsible brand we are committed to giving back
                to society. We believe in promoting sustainable prac- tices,
                uplifting farmer communities and ensuring that every cup of tea
                fosters a positive impact on society and the environment.
              </p>
              <p>
                With our passion for tea commitment to quality and dedication to
                fostering connections we invite you to embark on a tea journey
                like no other. Come indulge in the richness of Indian tea
                heritage with our brand and let every sip awaken your senses and
                soothe your soul. Experience the magic that lies in a cup of tea
                and join us as we create moments of pure bliss one sip at a
                time.
              </p>
            </small>
          </div>
        </div>
        <div className="col-md-5">
          <div className="bg-purple p-4">
            <img width="100%" src={opp} alt="Opportunities image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurStory;
