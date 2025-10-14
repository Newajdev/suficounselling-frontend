import React from 'react'
import logo from '../public/Logo.png'

function Runnner() {
    return (
        <div className="max-w-[1240px] mx-auto gap-10 h-screen flex justify-center items-center">
            <img src={logo} alt="" />
            <div>
                <h1 className="text-8xl font-black text-[#224047]">DIRI Sufi Counselling Center</h1>
                <p className="text-red-600 font-bold text-2xl mt-8">This website is under Construction <br />Please Stay with us we
                    will live soon</p>
                <div className="text-2xl font-black mt-5">
                    <p>For any info:</p>
                    <p>01711-817274, 01841-444433</p>
                </div>
            </div>
        </div>
    )
}

export default Runnner