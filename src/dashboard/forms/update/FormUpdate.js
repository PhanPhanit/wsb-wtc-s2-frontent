import React from 'react';
import DashBookFormUpdate from './DashBookFormUpdate';
import DashCategoryFormUpdate from './DashCategoryFormUpdate';
import DashSlideFormUpdate from './DashSlideFormUpdate';
import DashOrderFormUpdate from './DashOrderFormUpdate';
import DashUserFormUpdate from './DashUserFormUpdate';


const FormUpdate = {
    Category: <DashCategoryFormUpdate />,
    Book: <DashBookFormUpdate />,
    Slide: <DashSlideFormUpdate />,
    Order: <DashOrderFormUpdate />,
    User: <DashUserFormUpdate />
}

export {
    FormUpdate
};