import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

// const jobsArray = [1, 2, 3, 4,5,6,7,8]


function Jobs() {
    const {allJobs, searchedQuery} = useSelector(store=>store.job);
    const [fillterJobs, setFillterJobs] = useState(allJobs)
    useEffect(()=>{
        if(searchedQuery){
            const fillterjob = allJobs.filter((job)=>{
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || job.description.toLowerCase().includes(searchedQuery.toLowerCase()) || job.location.toLowerCase().includes(searchedQuery.toLowerCase()) // || job.salary.includes(searchedQuery)
            })
            setFillterJobs(fillterjob)
        }else{
            setFillterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    return (
        <div>
            <Navbar />

            <div className='max-w-7xl mx-auto'>
                <div className="flex gap-5">
                    <div className="w-[20%]">


                        <FilterCard />
                    </div>
                    {
                        fillterJobs.length <= 0 ? <span>Job not Found</span> : (
                            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                                <div className="grid grid-cols-3 gap-4">
                                    {
                                        fillterJobs.map((job) => (
                                            <motion.div 
                                            key={job._id}
                                            initial={{opacity:0, x:100}}
                                            animate={{opacity:1, x:0}}
                                            exit={{opacity:0, x:0}}
                                            transition={{duration:0.3}}
                                            >
                                                <Job job={job}/>
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs 
