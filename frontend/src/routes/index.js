import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Enrollment from '../pages/Enrollment';
import EditEnrollment from '../pages/Enrollment/Edit';
import NewEnrollment from '../pages/Enrollment/New';

import HelpOrder from '../pages/HelpOrder';
import Plan from '../pages/Plan';
import EditPlan from '../pages/Plan/Edit';
import NewPlan from '../pages/Plan/New';

import Student from '../pages/Student';
import EditStudent from '../pages/Student/Edit';
import NewStudent from '../pages/Student/New';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/enrollment" exact component={Enrollment} isPrivate />
      <Route
        path="/enrollment/edit/:enrollmentId"
        component={EditEnrollment}
        isPrivate
      />
      <Route path="/enrollment/new" component={NewEnrollment} isPrivate />

      <Route path="/plan" exact component={Plan} isPrivate />
      <Route path="/plan/edit/:planId" component={EditPlan} isPrivate />
      <Route path="/plan/new" component={NewPlan} isPrivate />

      <Route path="/student" exact component={Student} isPrivate />
      <Route
        path="/student/edit/:studentId"
        component={EditStudent}
        isPrivate
      />
      <Route path="/student/new" component={NewStudent} isPrivate />
      <Route path="/helporder" component={HelpOrder} isPrivate />
    </Switch>
  );
}
