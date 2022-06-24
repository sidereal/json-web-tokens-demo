import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import { refreshTest, tokenBasedSecurityTest, roleBasedSecurityTest, errorTest } from '../reference/testPageParameters'

import HomePage from "./Homepage";
import Header from "./header/Header";
import GenericTest from "./GenericTest";
import { ErrorHandler } from "./Error";

const AppRoutes = () => {

    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={HomePage} />
                <Route exact path="/refreshdemo" element={() => <GenericTest title='refresh demo' params={refreshTest} />} />
                <Route exact path="/errordemo" element={() => <GenericTest title='error demo' params={errorTest} />} />
                <Route exact path="/tokendemo" element={() => <GenericTest title='token demo' params={tokenBasedSecurityTest} />} />
                <Route exact path="/roledemo" element={() => <GenericTest title='role demo' params={roleBasedSecurityTest} />} />
                <Route exact path="/error" element={ErrorHandler} />
                <Route render={() => <h1>404: page not found</h1>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes

{/* <Router>
                    <Routes>
                        <Route path='/'>
                            <Route index element={<Navigate to="/home" />} />
                        </Route>
                        <Route path="home" element={<HomePage />} />
                        <Route path="bankadmin" element={<BankAdminPageWrapper />} />
                        <Route path="bankevents/:bankid" element={<BankEventsPageWrapper />} />
                        <Route path="channels/:id" element={<SubchannelLimitPageWrapper />} />
                        <Route path="channels" element={<ChannelLimitPageWrapper />} />
                        {/* <Route path="event/channels/:id" element={<EventChannelsPage />} /> */}
                        // <Route path="segments" element={<CustomerSegmentPageWrapper />} />
                        // <Route path="customer/types" element={<CustomerTypePageWrapper />} />
                        {/* <Route path="event/:eventid" element={<EventPageWrapper />} /> */}
                //         <Route path="event/:eventid/parameters" element={<EventParametersPageWrapper />} />
                //         <Route path="event/:eventid/parameter/:id" element={<SegmentedEventParametersPageWrapper />} />
                //         <Route path="event/:eventid/schedule" element={<EventSchedulePageWrapper />} />
                //         <Route path="event/:eventid/segments" element={<EventSegmentsPageWrapper />} />
                //         <Route path="event/counts" element={<EventRecyleAndPassCountPageWrapper />} />
                //         <Route path="event/ranking" element={<EventRankingPageWrapper />} />
                //         <Route path="event/types" element={<EventTypePageWrapper />} />
                //         <Route path="events/" element={<EventsPageWrapper />} />
                //         <Route path="events/campaign" element={<CampaignEventsPageWrapper />} />
                //         <Route path="filters" element={<FilterPageWrapper />} />
                //         <Route path="logs" element={<LogPageWrapper />} />
                //         <Route path="optimiser" element={<OptimiserPageWrapper />} />
                //         <Route path="product/types" element={<ProductTypePageWrapper />} />
                //         <Route path="products" element={<ProductPageWrapper />} />
                //         <Route path="recency" element={<RecencyLimitPageWrapper />} />
                //         <Route path="responsetypes" element={<ResponseTypePageWrapper />} />
                //         <Route path="scoringtypes" element={<ScoringTypePageWrapper />} />
                //         <Route path="transaction/codes" element={<TransactionCodePageWrapper />} />
                //         <Route path="transaction/types" element={<TransactionTypePageWrapper />} />
                //         {/* <Route path="events/dev" element={<EventsDevPage />} /> */}
                //         <Route path="test" element={<TestPage />} />
                //         <Route path="wrappertest" element={<EventTypePageWrapper />} />
                //         <Route path="dnd" element={<DndTestPage />} />
                //         <Route path="*" element={<HomePage />} />
                //     </Routes>
                // </Router> */}