import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="bg-white text-black border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">


                    <div>
                        <h2 className="text-2xl font-bold">Job Portal</h2>
                        <p className="mt-3 text-sm text-gray-600">
                            Your gateway to the best career opportunities.
                        </p>
                    </div>


                    <div>
                        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-500 transition">Home</a></li>
                            <li><a href="#" className="hover:text-gray-500 transition">Jobs</a></li>
                            <li><a href="#" className="hover:text-gray-500 transition">Browse</a></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                        <p className="text-sm text-gray-600">Email: support@jobportal.com</p>
                        <p className="text-sm text-gray-600">Phone: +92 300 1234567</p>
                    </div>


                    <div>
                        <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                        <div className="flex space-x-4 text-xl">
                            <a href="#" className="hover:text-gray-500 transition">🌐</a>
                            <a href="#" className="hover:text-gray-500 transition">🐦</a>
                            <a href="#" className="hover:text-gray-500 transition">📘</a>
                            <a href="#" className="hover:text-gray-500 transition">📸</a>
                        </div>
                    </div>

                </div>


                <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-600">
                    © 2025 Job Portal. All Rights Reserved.
                </div>
            </footer>

        </div>
    )
}

export default Footer
