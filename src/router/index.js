import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'

import ceshi from '@/components/ceshi'

import Basemargins from '@/components/businessparms/basemargins'
import Exchangerates from '@/components/businessparms/exchangerates'
import Instruments from '@/components/businessparms/instruments'
import Maininstruments from '@/components/businessparms/maininstruments'
import TradeCore from '@/components/businessparms/TradeCore'
import Marketupdown from '@/components/businessparms/marketupdown'
import Orgnotices from '@/components/businessparms/orgnotices'
import Temmargins from '@/components/templates/temmargins'
import TemmarginsInfo from '@/components/templates/temmarginsinfo'
import Commissiontemplates from '@/components/templates/commissiontemplates'
import Commissiontemplatesinfo from '@/components/templates/commissiontemplatesinfo'
import Risktemplates from '@/components/templates/risktemplates'
import Risktemplatesinfo from '@/components/templates/risktemplatesinfo'
import Agentfeetemplates from '@/components/templates/agentfeetemplates'
import Agentfeetemplatesinfo from '@/components/templates/agentfeetemplatesinfo'
import SubAccounts from '@/components/accounts/subaccounts'
import Parentaccounts from '@/components/accounts/parentaccounts'
import ParentaccountInfo from '@/components/accounts/parentaccounts/parentaccoutsInfo'
import Subaccounts from '@/components/accounts/subaccounts/subaccountsinfo'
import AgentTree from '@/components/agents/agentTree'
import Monitors from '@/components/monitors/monitors'
import Monitorsinfo from '@/components/monitors/monitorsinfo'
import Administrators from '@/components/administrators/administrators'
import adminFinancer from '@/components/administrators/adminFinancer'
import chargeviews from '@/components/financereviews/chargeviews'
import Withdrawreviews from '@/components/financereviews/withdrawreviews'
import Agentwithdrawreviews from '@/components/financereviews/agentwithdrawreviews'
import agentverify from '@/components/verifications/agentverify'
import subverify from '@/components/verifications/subverify'

import Login from '../login'
import todayreports from '@/components/selects/todayreports'
import historyreports from '@/components/selects/historyreports'
import feereports from '@/components/selects/feereports'
import accounts from '@/components/selects/accounts'
import exception from '@/components/selects/exception'
import statistics from '@/components/selects/statistics'

let Rurl = localStorage.getItem("url")
if (Rurl == null) {
  Rurl = "/login/"
} else {
  Rurl = Rurl.split("#")[1]
}

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: Rurl
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/ceshi',
      name: 'ffff',
      component: ceshi
    },
    {
      path: '/businessparms/basemargins',
      name: 'basemargins',
      component: Basemargins
    },
    {
      path: '/businessparms/exchangerates',
      name: 'exchangerates',
      component: Exchangerates
    },
    {
      path: '/businessparms/instruments',
      name: 'instruments',
      component: Instruments
    },
    {
      path: '/businessparms/maininstruments',
      name: 'maininstruments',
      component: Maininstruments
    },
    {
      path: '/businessparms/TradeCore',
      name: 'TradeCore',
      component: TradeCore
    },
    {
      path: '/businessparms/orgnotices',
      name: 'orgnotices',
      component: Orgnotices
    },
    {
      path: '/businessparms/marketupdown',
      name: 'marketupdown',
      component: Marketupdown
    },
    {
      path: '/templates/temmargins',
      name: 'temmargins',
      component: Temmargins
    },
    {
      path: '/templates/templatesinfo',
      name: 'TemmarginsInfo',
      component: TemmarginsInfo
    },
    {
      path: '/templates/commissiontemplates',
      name: 'commissiontemplates',
      component: Commissiontemplates
    },
    {
      path: '/templates/commissiontemplatesinfo',
      name: 'commissiontemplatesinfo',
      component: Commissiontemplatesinfo
    },
    {
      path: '/templates/risktemplates',
      name: 'risktemplates',
      component: Risktemplates
    },
    {
      path: '/templates/risktemplatesinfo',
      name: 'risktemplatesinfo',
      component: Risktemplatesinfo
    },
    {
      path: '/templates/agentfeetemplates',
      name: 'agentfeetemplates',
      component: Agentfeetemplates
    },
    {
      path: '/templates/agentfeetemplatesinfo',
      name: 'agentfeetemplatesinfo',
      component: Agentfeetemplatesinfo
    },
    {
      path: '/accounts/subaccounts/',
      name: 'subaccounts',
      component: SubAccounts
    },
    {
      path: '/accounts/parentaccounts',
      name: 'parentaccounts',
      component: Parentaccounts
    },
    {
      path: '/accounts/parentsaccoutinfo',
      name: 'parentsaccoutinfo',
      component: ParentaccountInfo
    },
    {
      path: '/accounts/subaccountsinfo',
      name: 'subaccountsinfo',
      component: Subaccounts
    },
    {
      path: '/monitors/monitors',
      name: 'monitors',
      component: Monitors
    },
    {
      path: '/monitors/monitorsinfo',
      name: 'monitorsinfo',
      component: Monitorsinfo
    },
    {
      path: '/administrators/administrators',
      name: 'administrators',
      component: Administrators
    },
    {
      path: '/administrators/adminFinancer',
      name: 'adminFinancer',
      component: adminFinancer
    },
    {
      path: '/agents/tree',
      name: 'AgentTree',
      component: AgentTree
    },
    {
      path: '/financereviews/chargeviews',
      name: 'chargeviews',
      component: chargeviews
    },
    {
      path: '/financereviews/withdrawreviews',
      name: 'withdrawreviews',
      component: Withdrawreviews
    },
    {
      path: '/financereviews/agentwithdrawreviews',
      name: 'agentwithdrawreviews',
      component: Agentwithdrawreviews
    },
    {
      path: '/login/:id',
      name: 'login',
      component: Login
    },
    {
      path: '/login/',
      component: Login
    },
    {
      path: '/selects/todayreports',
      name: 'todayreports',
      component: todayreports
    },
    {
      path: '/selects/historyreports',
      name: 'historyreports',
      component: historyreports
    },
    {
      path: '/selects/feereports',
      name: 'feereports',
      component: feereports
    },
    {
      path: '/selects/accounts',
      name: 'accounts',
      component: accounts
    },
    {
      path: '/selects/exception',
      name: 'exception',
      component: exception
    },
    {
      path: '/selects/statistics',
      name: 'statistics',
      component: statistics
    },
    {
      path: '/verifications/subverify',
      name: 'subverify',
      component: subverify
    },
    {
      path: '/verifications/agentverify',
      name: 'agentverify',
      component: agentverify
    }
  ]
})
