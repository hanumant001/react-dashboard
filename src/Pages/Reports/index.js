import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import mockData from '../Analytics/AnalyticsData';  

export default function Reports() {
    const [movies, setMovies] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        leadRole: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        collections: { value: null, matchMode: FilterMatchMode.EQUALS },
        userRating: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        setMovies(mockData);
        setLoading(false);
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const collectionsBodyTemplate = (rowData) => {
        return `₹${rowData.collections.toLocaleString()}`;
    };

    const userRatingBodyTemplate = (rowData) => {
        return rowData.userRating.toFixed(1);
    };

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable value={movies} size='small' paginator rows={9} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                globalFilterFields={['name', 'category', 'leadRole', 'collections', 'userRating']} header={header} emptyMessage="No movies found.">
                <Column field="name" header="Name" filter sortable filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                <Column field="category" header="Category" filter sortable filterPlaceholder="Search by category" style={{ minWidth: '12rem' }} />
                <Column field="date" header="Release Date" sortable style={{ minWidth: '10rem' }} />
                <Column field="collections" header="Collections" body={collectionsBodyTemplate} filter sortable filterPlaceholder="Search by collections" style={{ minWidth: '12rem' }} />
                <Column field="userRating" header="User Rating" body={userRatingBodyTemplate} filter sortable filterPlaceholder="Search by rating" style={{ minWidth: '10rem' }} />
            </DataTable>
        </div>
    );
}
