import React from 'react';
import DashBookFormCreate from './DashBookFormCreate';
import DashCategoryFormCreate from "./DashCategoryFormCreate";
import DashSlideFormCreate from './DashSlideFormCreate';
import DashUserFormCreate from './DashUserFormCreate';


const FormCreate = {
    Category: <DashCategoryFormCreate />,
    Book: <DashBookFormCreate />,
    Slide: <DashSlideFormCreate />,
    User: <DashUserFormCreate />
}

export {
    FormCreate
};