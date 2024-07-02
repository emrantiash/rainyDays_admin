'use client';
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


export default function Page({ params, searchParams }) {
    searchParams = useSearchParams();

    const name = searchParams.get('name');
    const amount = searchParams.get('amount');
    const id = searchParams.get('id')


    return (
        <main >
            <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fas fa-download fa-sm text-white-50"></i> Print Report</a>
                </div>

                {/* Content Row */}
                <div className="row">

                    {/* Earnings (Monthly) Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <Link href="/order">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                {name}
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                {amount}
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                

                {/* <div className="row">

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>01890009876</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>01912345543</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td >Larry the Bird</td>
                                <td>01512345543</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>01890009876</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>01912345543</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td >Larry the Bird</td>
                                <td>01512345543</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Mark</td>
                                <td>01890009876</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>Jacob</td>
                                <td>01912345543</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">6</th>
                                <td >Larry the Bird</td>
                                <td>01512345543</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th scope="row">7</th>
                                <td>Mark</td>
                                <td>01890009876</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">8</th>
                                <td>Jacob</td>
                                <td>01912345543</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">9</th>
                                <td >Larry the Bird</td>
                                <td>01512345543</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th scope="row">10</th>
                                <td>Mark</td>
                                <td>01890009876</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">11</th>
                                <td>Jacob</td>
                                <td>01912345543</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">12</th>
                                <td >Larry the Bird</td>
                                <td>01512345543</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th scope="row">13</th>
                                <td>Mark</td>
                                <td>01890009876</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">14</th>
                                <td>Jacob</td>
                                <td>01912345543</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">15</th>
                                <td >Larry the Bird</td>
                                <td>01512345543</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th scope="row">16</th>
                                <td>Mark</td>
                                <td>01890009876</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">17</th>
                                <td>Jacob</td>
                                <td>01912345543</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">18</th>
                                <td >Larry the Bird</td>
                                <td>01512345543</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th scope="row">19</th>
                                <td>Jacob</td>
                                <td>01912345543</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">20</th>
                                <td >Larry the Bird</td>
                                <td>01512345543</td>
                                <td>@twitter</td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div> */}
            </div>
        </main>
    )
}