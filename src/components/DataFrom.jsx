import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"



const DataFrom = () => {
  const [districts, setDistricts] = useState([])
  const [addinput, setAddInput] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)
  // =================================================
  const fnameValue = watch("Fname")
  const FathernameValue = watch("fatherName")
  const AgeValue = watch("Age")
  const otherValue = watch("other")
  const otherinfoValue = watch("otherinfo")


  // =================================================
  useEffect(() => {
    if (otherValue === 'Other') {
      setAddInput(true)
    } else {
      setAddInput(false)
    }
  }, [otherValue])

  useEffect(() => {
    axios("http://bdapis.com/api/v1.2/districts")
      .then((res) => setDistricts(res?.data?.data))
  }, [])

  // console.log(districts);




  return (
    <section className="w-full p-20">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">

        {/* name */}
        <div className="relative mb-3">
          <label
            htmlFor="name"
            className={`
            absolute left-5 text-gray-500 transition-all duration-200
            ${fnameValue
                ? "-top-2 text-sm bg-white px-1 "
                : "top-2 opacity-0 pointer-events-none"}
          `}
          >
            Foriyadi Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg py-2 px-5 my-1 text-darkGreen focus:outline-darkGreen"
            type="text"
            id="name"
            placeholder="Input your Name"
            {...register("Fname", { required: true })}
          />
          {errors.Fname &&
            <span className="text-red-500 text-sm">Foriyadi Name is Required</span>
          }
        </div>

        {/* fathers name */}
        <div className="relative mb-3">
          <label
            htmlFor="fatherName"
            className={`
            absolute left-5 text-gray-500 transition-all duration-200
            ${FathernameValue
                ? "-top-2 text-sm bg-white px-1 "
                : "top-2 opacity-0 pointer-events-none"}
          `}
          >
            Father's Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg py-2 px-5 my-1 text-darkGreen focus:outline-darkGreen"
            type="text"
            id="fatherName"
            placeholder="Father's Name"
            {...register("fatherName", { required: true })}
          />
          {errors.fatherName &&
            <span className="text-red-500 text-sm">Foriyadi Father's Name is Required</span>
          }
        </div>

        <div className="flex items-center gap-4">

          {/* Age */}
          <div className="relative mb-3">
            <label
              htmlFor="Age"
              className={`
            absolute left-5 text-gray-500 transition-all duration-200
            ${AgeValue
                  ? "-top-2 text-sm bg-white px-1 "
                  : "top-2 opacity-0 pointer-events-none"}
          `}
            >
              Your Age
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg py-2 px-5 my-1 text-darkGreen focus:outline-darkGreen"
              type="text"
              id="Age"
              placeholder="Your Age"
              {...register("Age", { required: true })}
            />
            {errors.Age &&
              <span className="text-red-500 text-sm">Foriyadi Father's Name is Required</span>
            }
          </div>
          {/* Gender */}
          <div className="relative mb-3">

            <div className="w-full border border-gray-300 rounded-lg py-2 px-5 my-1 text-darkGreen focus:outline-darkGreen">
              <select className="w-full rounded-lg  my-1 text-darkGreen focus:outline-none">
                <option disabled selected>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

          </div>
          {/* Gender2 */}
          <div className="relative mb-3">

            <div className="w-full border border-gray-300 rounded-lg py-2 px-5 my-1 text-darkGreen focus:outline-darkGreen">
              <select className="w-full rounded-lg  my-1 text-darkGreen focus:outline-none" {...register("other", { required: true })}>
                <option disabled selected>other</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

          </div>
          {
            addinput && <div className="relative mb-3">
            <label
              htmlFor="otherinfo"
              className={`
            absolute left-5 text-gray-500 transition-all duration-200
            ${otherinfoValue
                  ? "-top-2 text-sm bg-white px-1 "
                  : "top-2 opacity-0 pointer-events-none"}
          `}
            >
              Other Info
            </label>
            <input
              className="border border-gray-300 rounded-lg py-2 px-5 my-1 text-darkGreen focus:outline-darkGreen"
              type="text"
              id="other-info"
              placeholder="Other Info"
              {...register("otherinfo", { required: true })}
            />
            {errors.otherinfo &&
              <span className="text-red-500 text-sm">Foriyadi Father's Name is Required</span>
            }
          </div>
          }


        </div>



      </form>


    </section>
  )
}

export default DataFrom