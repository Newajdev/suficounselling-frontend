import React from 'react'
import logo from '../public/Logo.png'

function Runnner() {
    return (
        <div className="lg:max-w-[1240px] h-screen text-center lg:text-left mx-auto gap-5 lg:gap-10 flex flex-col lg:flex-row justify-center items-center">
            <img className='w-1/2' src={logo} alt="" />
            <div>
                <h1 className="text-4xl lg:text-8xl font-black text-[#224047]">DIRI Sufi Counselling Center</h1>
                <p className="text-red-600 font-bold text-lg lg:text-2xl mt-8">This website is under Construction <br />Please Stay with us we
                    will live soon</p>
                <div className="text-lg lg:text-2xl font-black mt-5">
                    <p>For any info:</p>
                    <p>01711-817274, 01841-444433</p>
                </div>
            </div>
        </div>
    )
}

export default Runnner