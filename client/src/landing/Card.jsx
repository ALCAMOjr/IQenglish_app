import image1 from "../assets/blogs/blog-01/image1.jpg"
import image2 from "../assets/blogs/blog-01/image2.jpg"
import image3 from "../assets/blogs/blog-01/image3.jpg"
import "../css/Tailwind.css"



const Card = () => {
    return (

        <section className="bg-gradient-to-b from-white to-blue-50 w-full h-full pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span className="mb-2 block text-lg font-semibold text-primary font-montserrat">
                  Nuestro Blog
                </span>
                <h2
                  className="mb-4 text-3xl font-bold text-dark text-dark sm:text-4xl md:text-[40px] font-montserrat"
                >
                 IQENGLISH LIVE
                </h2>
                <p className="text-base text-dark dark:text-dark-6 font-montserrat">
                Nos mantendremos actualizados para darles las noticias o sucesos mas recientes.
                </p>
              </div>
            </div>
          </div>
  
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="mb-10 w-full">
                <div className="mb-8 overflow-hidden rounded">
                  <img
                    src={image1}
                    alt="image"
                    className="w-full"
                  />
                </div>
                <div>
                  <span
                    className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white font-montserrat"
                  >
                    Diciembre 22, 2023
                  </span>
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="mb-4 inline-block font-montserrat text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                    >
                      Meet AutoManage, the best AI management tools
                    </a>
                  </h3>
                  <p className="text-base text-body-color font-montserrat dark:text-dark-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="mb-10 w-full"> 
                <div className="mb-8 overflow-hidden rounded">
                  <img
                    src={image2}
                    alt="image"
                    className="w-full"
                  />
                </div>
                <div>
                  <span
                    className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose font-montserrat text-white"
                  >
                    Marzo 15, 2023
                  </span>
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="mb-4 inline-block text-xl font-montserrat font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                    >
                      How to earn more money as a wellness coach
                    </a>
                  </h3>
                  <p className="text-base text-body-color font-montserrat dark:text-dark-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="mb-10 w-full">
                <div className="mb-8 overflow-hidden rounded">
                  <img
                    src={image3}
                    alt="image"
                    className="w-full"
                  />
                </div>
                <div>
                  <span
                    className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold font-montserrat leading-loose text-white"
                  >
                    Junio 05, 2023
                  </span>
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="mb-4 inline-block text-xl font-montserrat font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                    >
                      The no-fuss guide to upselling and cross selling
                    </a>
                  </h3>
                  <p className="text-base font-montserrat text-body-color dark:text-dark-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Card