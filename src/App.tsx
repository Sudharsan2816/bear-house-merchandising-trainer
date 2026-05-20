import { useMemo, useState } from 'react'
import './App.css'

type DeepTopic = {
  title: string
  beginner: string
  operator: string
  parameters: { name: string; meaning: string; whyItMatters: string }[]
  scenario: string
  calculation?: string
  excel: string
  mistakes: string[]
  interviewTrap: string
  masteryCheck: string[]
}

type Phase = {
  title: string
  outcome: string
  deepTopics: DeepTopic[]
}

const phases: Phase[] = [
  {
    title: 'Phase 1 · How fashion retail actually works',
    outcome: 'Master the business flow from cash to product to customer to cash recovery, and understand why merchandising is business risk control.',
    deepTopics: [
      {
        title: 'Retail business model: cash → inventory → sales → cash',
        beginner: 'A fashion brand first spends money before earning money. It buys fabric, trims, production capacity, packaging and warehouse space. Finished goods then sit as inventory until customers buy them. Until sold profitably, inventory is cash locked in cloth form.',
        operator: 'A merchandiser protects cash rotation. The question is not just “will this shirt sell?” but “will this shirt sell fast enough, at enough margin, in the right sizes/channels, before season and trend value drops?”',
        parameters: [
          { name: 'MRP', meaning: 'Maximum Retail Price printed/listed for the product.', whyItMatters: 'MRP creates the price ceiling and discount perception. A high MRP with constant heavy discount can inflate sales but train customers to wait.' },
          { name: 'ASP', meaning: 'Average Selling Price after discounts, coupons and marketplace event pricing.', whyItMatters: 'Actual revenue comes from ASP, not MRP. Merchandisers judge profitability using ASP.' },
          { name: 'COGS / cost', meaning: 'Product cost including fabric, trims, manufacturing and sometimes packaging.', whyItMatters: 'If cost is too high, even good sales may not create contribution after commission and returns.' },
          { name: 'Inventory value', meaning: 'Units in stock multiplied by cost or retail value depending on report.', whyItMatters: 'Shows how much cash is blocked and how much risk exists if stock ages.' },
        ],
        scenario: 'The Bear House produces 2,000 checked shirts at ₹650 cost each. ₹13,00,000 is blocked before the first sale. If only 700 sell, 1,300 pieces become cash blockage, warehouse blockage and markdown risk.',
        calculation: 'Contribution example: ASP ₹1,499 - cost ₹650 - commission/logistics ₹350 = ₹499 before overhead. If ASP falls to ₹1,099, contribution drops to ₹99.',
        excel: 'Create columns: SKU, MRP, ASP, Cost, Commission, Logistics, Return Provision, Contribution. Formula: =ASP-Cost-Commission-Logistics-ReturnProvision.',
        mistakes: ['Judging product success only by units sold.', 'Ignoring return cost and marketplace commission.', 'Thinking inventory is an asset forever; aged inventory becomes a liability.', 'Not connecting buying quantity to cash flow.'],
        interviewTrap: 'If asked “what is merchandising?”, do not say “selecting products”. Say it is planning, buying, allocating and controlling inventory to maximize profitable sales while reducing stockout, deadstock and margin risk.',
        masteryCheck: ['Explain why ₹13 lakh of shirts is not automatically wealth.', 'Explain why ASP matters more than MRP.', 'Explain how a high-sales product can still be weak.'],
      },
      {
        title: 'Omnichannel reality: D2C, Myntra, Ajio, Amazon and offline are different businesses',
        beginner: 'The same shirt behaves differently on every channel. Customers, discounts, commissions, returns, delivery expectations and visibility rules are different.',
        operator: 'Channel allocation is a margin and velocity decision. You push stock where it sells profitably, where it clears risk, or where it supports brand strategy. You do not blindly split stock equally.',
        parameters: [
          { name: 'Channel margin', meaning: 'Profit after channel-specific commission, logistics, returns and discounts.', whyItMatters: 'A channel with higher sales can still be less profitable.' },
          { name: 'Channel velocity', meaning: 'How fast a SKU sells on a specific platform.', whyItMatters: 'High-velocity channels can clear stock faster but may demand discounting.' },
          { name: 'Return rate', meaning: 'Returned units divided by sold units.', whyItMatters: 'Fashion return rates can erase margin because shipping, reverse logistics and damaged returns cost money.' },
          { name: 'Reserved stock', meaning: 'Stock blocked for open orders but not yet shipped or settled.', whyItMatters: 'ERP may show stock that is not truly available for fresh orders.' },
        ],
        scenario: 'A linen shirt has 60% sell-through on D2C at ₹1,899 ASP, but only 25% on Amazon at ₹1,399 ASP. Do not move all stock to Amazon just for reach; first compare contribution and return rate.',
        calculation: 'D2C contribution may be ₹1,899 - ₹750 - ₹120 logistics - ₹80 return provision = ₹949. Amazon contribution may be ₹1,399 - ₹750 - ₹350 commission - ₹120 logistics - ₹100 return provision = ₹79.',
        excel: 'Pivot by SKU and Channel. Values: Units Sold, ASP, Contribution, Return %. Add calculated field: Contribution = ASP - Cost - Commission - Logistics - ReturnProvision.',
        mistakes: ['Sending scarce bestseller stock to the lowest-margin channel.', 'Ignoring marketplace campaign obligations.', 'Comparing channels on revenue instead of contribution.', 'Not checking size availability per channel.'],
        interviewTrap: 'If asked “where will you allocate remaining stock?”, answer with margin, velocity, returns, campaign need, customer fit and brand strategy — not “where sales are highest” only.',
        masteryCheck: ['Explain why D2C can be more profitable but not always easier.', 'Explain why Myntra can be useful for discovery and liquidation.', 'Explain why Amazon customers may behave differently from D2C customers.'],
      },
    ],
  },
  {
    title: 'Phase 2 · Retail math mastery',
    outcome: 'Break every metric into numerator, denominator, time period, interpretation and action.',
    deepTopics: [
      {
        title: 'Sell-through percentage (ST%)',
        beginner: 'Sell-through tells what percentage of available/bought stock has sold in a given period. It answers: “How much of what we bought has converted into sales?”',
        operator: 'ST% is a demand-quality signal only when tied to time, stock availability, discount, channel and size mix. 30% in 7 days may be excellent; 30% in 90 days may be weak.',
        parameters: [
          { name: 'Units sold', meaning: 'Number of units sold during the period.', whyItMatters: 'This is the numerator. If returns are high, also check net sales after returns.' },
          { name: 'Opening stock / buy quantity', meaning: 'Stock available at the start or total bought for the launch.', whyItMatters: 'This is the denominator. Wrong denominator creates misleading ST%.' },
          { name: 'Time period', meaning: 'Days/weeks/months over which sales happened.', whyItMatters: 'ST% is meaningless without time. It measures speed only with period context.' },
          { name: 'Discount level', meaning: 'Markdown used to generate sales.', whyItMatters: 'High ST% at 70% off is not the same as high ST% at 25% off.' },
        ],
        scenario: 'A shirt launched with 800 units and sold 240 units in 30 days. ST% = 30%. If planned ST% was 35%, it is slightly behind. If it achieved this without discount and with low returns, it may still be healthy.',
        calculation: 'ST% = 240 ÷ 800 × 100 = 30%. Net ST% after 40 returns = (240-40) ÷ 800 × 100 = 25%.',
        excel: '=SalesUnits/OpeningStock. Net version: =(SalesUnits-ReturnUnits)/OpeningStock.',
        mistakes: ['Calling ST% good without knowing period.', 'Ignoring returns.', 'Using current closing stock as denominator accidentally.', 'Not checking whether key sizes were out of stock.'],
        interviewTrap: 'Interviewer may ask “is 30% ST good?” Best answer: “It depends on the time period, category plan, season, discount, margin, returns and stock availability.”',
        masteryCheck: ['Calculate gross and net ST%.', 'Explain why ST% can be inflated by markdown.', 'Explain why broken sizes can reduce ST%.'],
      },
      {
        title: 'Weeks of Supply (WOS)',
        beginner: 'WOS tells how many weeks current stock will last at the current selling speed.',
        operator: 'WOS is the bridge between selling speed and replenishment. A product can be selling well but still be in danger if WOS is below lead time.',
        parameters: [
          { name: 'Closing stock', meaning: 'Units currently available or usable for future sale.', whyItMatters: 'Numerator. Must exclude damaged, reserved or blocked stock when making decisions.' },
          { name: 'Average weekly sales', meaning: 'Recent weekly selling rate.', whyItMatters: 'Denominator. Use the right window: latest 2-4 weeks for fast fashion, longer for stable basics.' },
          { name: 'Lead time', meaning: 'Weeks needed to replenish from fabric/order to warehouse availability.', whyItMatters: 'If WOS < lead time, stockout risk exists.' },
          { name: 'Season remaining', meaning: 'How much selling season is left.', whyItMatters: 'High WOS is risky near season end but normal before peak season.' },
        ],
        scenario: 'A navy shirt has 350 units left and sells 325 units/week. WOS is 1.08 weeks. If replenishment lead time is 6.4 weeks, the brand will stock out long before new stock arrives.',
        calculation: 'WOS = 350 ÷ 325 = 1.08 weeks. Gap vs lead time = 6.4 - 1.08 = 5.32 weeks uncovered.',
        excel: '=ClosingStock/(SalesLast30Days/4.3). Risk flag: =IF(WOS<LeadTimeWeeks,"Stockout risk","Safe").',
        mistakes: ['Using lifetime average sales for a trending product.', 'Including blocked/damaged stock.', 'Ignoring lead time.', 'Not checking size-level WOS.'],
        interviewTrap: 'If a bestseller has low WOS, do not just say “reorder”. Also protect stock, reduce unnecessary discounts, allocate to high-margin channels and check fabric/production feasibility.',
        masteryCheck: ['Calculate WOS from daily/weekly/monthly sales.', 'Explain why 10 WOS can be bad for seasonal stock.', 'Explain why size-level WOS matters.'],
      },
      {
        title: 'IMU, maintained margin and markdowns',
        beginner: 'Initial markup is the planned margin at full price. Maintained margin is the real margin after discounts, markdowns, returns and operational costs.',
        operator: 'Fashion businesses often look healthy at IMU level but weak at maintained margin level. Merchandisers must know how much discount a product can absorb before contribution collapses.',
        parameters: [
          { name: 'Initial markup (IMU)', meaning: '(MRP - Cost) ÷ MRP.', whyItMatters: 'Shows pricing room before discounts but does not prove actual profit.' },
          { name: 'Markdown %', meaning: '(Original price - new price) ÷ original price.', whyItMatters: 'Shows how much price was sacrificed to move inventory.' },
          { name: 'Maintained margin', meaning: 'Actual gross margin after markdowns and cost adjustments.', whyItMatters: 'Closer to reality than IMU.' },
          { name: 'Contribution', meaning: 'ASP minus cost, commission, logistics and return provision.', whyItMatters: 'Most useful for channel decisions.' },
        ],
        scenario: 'A shirt with MRP ₹2,499 and cost ₹650 has 74% IMU. But if sold at ₹1,099 after marketplace commission and returns, contribution can become very low.',
        calculation: 'IMU = (2499-650)/2499 = 74%. Markdown from ₹2,499 to ₹1,499 = 40%. Contribution at ₹1,499 with ₹350 channel cost = ₹499.',
        excel: 'IMU: =(MRP-Cost)/MRP. Markdown: =(MRP-ASP)/MRP. Contribution: =ASP-Cost-Commission-Logistics-ReturnProvision.',
        mistakes: ['Confusing markup with margin.', 'Thinking discount always increases profit because units increase.', 'Ignoring commission as a percentage of ASP.', 'Not calculating return provision.'],
        interviewTrap: 'If asked “should we give 50% discount?”, answer by calculating contribution, stock age, season risk, competitive price, brand impact and liquidation need.',
        masteryCheck: ['Break down IMU numerator and denominator.', 'Explain why maintained margin is lower than IMU.', 'Calculate contribution at two discount levels.'],
      },
      {
        title: 'GMROI, stock-to-sales and weighted averages',
        beginner: 'GMROI tells how much gross margin the company earns for every rupee invested in inventory. Stock-to-sales shows whether inventory is balanced against sales. Weighted averages stop high-volume products from being hidden by simple averages.',
        operator: 'These metrics help senior merchandisers compare categories. A low-volume premium style may look good on margin %, but GMROI and stock productivity reveal whether inventory investment is justified.',
        parameters: [
          { name: 'Gross margin', meaning: 'Sales revenue minus product cost, before or after channel costs depending on company convention.', whyItMatters: 'Numerator for GMROI. Must use consistent definition.' },
          { name: 'Average inventory cost', meaning: '(Beginning inventory cost + ending inventory cost) ÷ 2.', whyItMatters: 'Denominator for GMROI; shows capital tied up.' },
          { name: 'Stock-to-sales ratio', meaning: 'Inventory value ÷ sales value for a period.', whyItMatters: 'High ratio signals overstock; low ratio signals stockout risk.' },
          { name: 'Weight', meaning: 'Importance given based on units or revenue.', whyItMatters: 'Weighted ASP/margin reflects true business mix.' },
        ],
        scenario: 'Category A sells ₹10L with 40% margin and ₹2L average inventory cost. GMROI = 2.0. Category B sells ₹6L with 55% margin and ₹1L average inventory cost. GMROI = 3.3, so B uses inventory more efficiently.',
        calculation: 'A: gross margin ₹4L ÷ avg inventory ₹2L = 2.0. B: ₹3.3L ÷ ₹1L = 3.3.',
        excel: 'GMROI: =GrossMargin/AverageInventoryCost. Weighted ASP: =SUMPRODUCT(UnitsRange, ASPRange)/SUM(UnitsRange).',
        mistakes: ['Using simple average ASP when sales volume differs.', 'Comparing GMROI across periods with different seasonality.', 'Using retail inventory value instead of cost inventory value inconsistently.', 'Ignoring inventory age.'],
        interviewTrap: 'If asked which category is better, do not pick only higher revenue. Compare margin, inventory investment, velocity, returns and strategic role.',
        masteryCheck: ['Explain why weighted ASP is better than simple ASP.', 'Calculate GMROI from margin and inventory cost.', 'Interpret high stock-to-sales ratio.'],
      },
    ],
  },
  {
    title: 'Phase 3 · Excel for merchandising decisions',
    outcome: 'Build reports that convert messy ERP/marketplace exports into decisions.',
    deepTopics: [
      {
        title: 'SUMIFS, XLOOKUP, IF and SUMPRODUCT in real reports',
        beginner: 'Excel is where merchandisers combine sales, stock, cost, returns and SKU master data. The goal is not pretty formulas; the goal is quick reliable decisions.',
        operator: 'A daily tracker should answer: what sold, what is left, what is at risk, where is stock stuck, which styles need markdown/replenishment, and whether channel stock matches ERP stock.',
        parameters: [
          { name: 'Lookup key', meaning: 'Unique identifier such as SKU or barcode.', whyItMatters: 'If SKU codes are inconsistent, all lookups and reconciliations fail.' },
          { name: 'Criteria range', meaning: 'Column checked by SUMIFS such as channel/date/category.', whyItMatters: 'Wrong range length or wrong criteria creates wrong totals.' },
          { name: 'Return column', meaning: 'Column XLOOKUP pulls, such as cost or category.', whyItMatters: 'Missing cost means margin cannot be calculated.' },
          { name: 'Action flag', meaning: 'IF logic that labels replenish/markdown/monitor.', whyItMatters: 'Turns numbers into operational next steps.' },
        ],
        scenario: 'You receive three exports: ERP stock, Myntra sales and SKU master. SKU TBH-SH-001 appears as TBH SH 001 in one file. If not cleaned, XLOOKUP shows Missing and the report undercounts sales.',
        calculation: 'If Myntra sales 120 + D2C sales 80 + Ajio sales 50, total sales from SUMIFS should be 250. Cross-check pivot totals before presenting.',
        excel: '=SUMIFS(Sales[Qty],Sales[SKU],A2,Sales[Channel],"Myntra"); =XLOOKUP(A2,Master[SKU],Master[Cost],"Missing"); =IF(ST<20%,"Slow mover",IF(WOS<LeadTime,"Replenish","Monitor")); =SUMPRODUCT(Units,ASP)/SUM(Units).',
        mistakes: ['Not removing extra spaces and inconsistent SKU formats.', 'Blindly trusting pivot totals without source total checks.', 'Using VLOOKUP when duplicate keys exist.', 'Not freezing formulas before sharing files.'],
        interviewTrap: 'If asked your Excel strength, describe a business report you can build: SKU-level sales-stock-margin tracker with action flags and reconciliation checks.',
        masteryCheck: ['Explain every argument in SUMIFS.', 'Explain what XLOOKUP returns when SKU is missing.', 'Create an IF flag for stockout risk.'],
      },
      {
        title: 'Inventory reconciliation logic',
        beginner: 'Reconciliation checks why stock in ERP, warehouse and marketplace panels differ.',
        operator: 'Never adjust stock blindly. Rebuild the movement: opening + inward + returns - sales - transfers - damaged - reserved - manual adjustments = expected closing.',
        parameters: [
          { name: 'Opening stock', meaning: 'Stock at the start of the reconciliation period.', whyItMatters: 'All movement math depends on a correct starting point.' },
          { name: 'GRN / inward', meaning: 'Goods received note quantity added to warehouse/ERP.', whyItMatters: 'If GRN is delayed, physical stock and ERP stock differ.' },
          { name: 'Sales and cancellations', meaning: 'Orders shipped, cancelled or pending.', whyItMatters: 'Cancelled orders may release reserved stock.' },
          { name: 'Returns and QC status', meaning: 'Returned units classified as saleable, damaged or blocked.', whyItMatters: 'Returned stock should not always go back to saleable inventory.' },
        ],
        scenario: 'ERP shows 500 units, Myntra shows 420, warehouse count says 485. Possible causes: 40 reserved marketplace orders, 15 damaged returns not blocked, pending GRN, failed sync, duplicate SKU mapping or manual adjustment.',
        calculation: 'Expected closing = 500 opening + 100 GRN + 20 saleable returns - 90 sales - 15 damaged - 30 reserved = 485.',
        excel: '=Opening+GRN+SaleableReturns-Sales-Damaged-Reserved-Transfers. Difference: =ERPClosing-ExpectedClosing.',
        mistakes: ['Treating all returns as saleable.', 'Ignoring reserved orders.', 'Not separating physical stock from system stock.', 'Fixing marketplace stock without identifying root cause.'],
        interviewTrap: 'A strong answer lists transaction buckets in order. A weak answer says “I will inform warehouse” only.',
        masteryCheck: ['Write the reconciliation equation from memory.', 'List five reasons for stock mismatch.', 'Explain why returned stock needs QC before resale.'],
      },
    ],
  },
  {
    title: 'Phase 4 · Inventory and assortment planning',
    outcome: 'Decide how many styles, colors and sizes to buy without creating stockout or deadstock.',
    deepTopics: [
      {
        title: 'Breadth vs depth and SKU rationalization',
        beginner: 'Breadth means many different styles. Depth means more units per style. Too much breadth creates tiny quantities and broken availability. Too much depth creates overstock if the style fails.',
        operator: 'Fast-growing brands must decide which styles deserve depth based on proven demand, fabric availability, margin and replenishment lead time. SKU rationalization removes duplicate, weak or confusing styles.',
        parameters: [
          { name: 'Style count', meaning: 'Number of unique designs/options.', whyItMatters: 'More styles increase choice but also complexity and forecasting error.' },
          { name: 'Depth per style', meaning: 'Units bought for each style/color/size combination.', whyItMatters: 'Too little depth causes stockout; too much depth causes deadstock.' },
          { name: 'Size curve', meaning: 'Planned split across S/M/L/XL/XXL.', whyItMatters: 'Wrong size curve creates unusable stock even when total stock looks high.' },
          { name: 'SKU productivity', meaning: 'Sales/margin generated by each SKU.', whyItMatters: 'Low productivity SKUs should be reduced, improved or discontinued.' },
        ],
        scenario: 'Two blue casual shirts are visually similar. One sells 20 units/week and the other 3 units/week. Rationalization may stop the weak SKU and increase depth in the stronger one.',
        calculation: 'If 1,000 units follow size ratio S10/M25/L30/XL25/XXL10, buy = 100/250/300/250/100. If actual sales mix is M30/L35/XL25, next buy should shift toward M/L.',
        excel: 'Sales mix % by size = SizeSales/TotalSales. Stock mix % = SizeStock/TotalStock. Variance = SalesMix-StockMix. Flag if ABS(Variance)>8%.',
        mistakes: ['Buying equal units across all sizes.', 'Keeping too many low-selling duplicate styles.', 'Looking at category sales but not SKU productivity.', 'Ignoring lead time when planning depth.'],
        interviewTrap: 'If asked “shirts are selling well, what will you buy?”, answer by category, subcategory, fabric, color, size curve, margin, channel and replenishment feasibility.',
        masteryCheck: ['Define breadth and depth with an example.', 'Explain broken size inventory.', 'Explain when to kill a SKU.'],
      },
      {
        title: 'Deadstock prevention and replenishment logic',
        beginner: 'Deadstock is inventory that stops selling or sells only with heavy discount. Replenishment is buying more of what is selling before it stocks out.',
        operator: 'The art is identifying demand early without overreacting to launch spikes. Replenish only after checking velocity, margin, returns, reviews, seasonality, fabric stock and production capacity.',
        parameters: [
          { name: 'Stock age', meaning: 'Days since stock became available for sale.', whyItMatters: '0-30 days is fresh; 60-90 needs action; 90+ may need liquidation.' },
          { name: 'Sales velocity', meaning: 'Units sold per day/week.', whyItMatters: 'Shows how fast stock converts.' },
          { name: 'Lead time', meaning: 'Time to receive new stock.', whyItMatters: 'Replenishment must start before WOS reaches zero.' },
          { name: 'Demand quality', meaning: 'Whether demand is profitable, low-return and not only discount-driven.', whyItMatters: 'Bad demand should not be repeated blindly.' },
        ],
        scenario: 'A bestseller has 2 WOS left and 6-week lead time. Actions: raise repeat PO, check fabric, reduce discount, allocate remaining stock to best margin channels, promote substitutes and update forecast.',
        calculation: 'Required cover = lead time weeks + safety stock weeks. If weekly sales = 200, lead time = 6 weeks, safety = 2 weeks, target stock = 1,600 units.',
        excel: 'Reorder qty = (WeeklySales*(LeadTimeWeeks+SafetyWeeks))-CurrentSaleableStock-OnOrder. Use MAX(0,result).',
        mistakes: ['Replenishing only after stockout.', 'Repeating a style with high returns.', 'Ignoring fabric MOQ and production constraints.', 'Discounting fresh slow stock before diagnosing listing/price/size issues.'],
        interviewTrap: 'A fast seller is not automatically a reorder. Check if it sold because of deep discount, influencer spike, one-time campaign or wrong inventory denominator.',
        masteryCheck: ['Calculate reorder quantity.', 'Explain safety stock.', 'List actions before markdowning old stock.'],
      },
    ],
  },
  {
    title: 'Phase 5 · OTB, forecasting and markdown management',
    outcome: 'Control future buying budget based on planned sales, actual performance, stock targets and on-order commitments.',
    deepTopics: [
      {
        title: 'Open-to-Buy (OTB)',
        beginner: 'OTB is the amount you are still allowed to buy without exceeding the inventory plan. It is a budget control tool.',
        operator: 'OTB prevents emotional buying. If sales underperform, OTB shrinks. If sales overperform and inventory is low, OTB can increase — but only if margin and demand quality are healthy.',
        parameters: [
          { name: 'Planned sales', meaning: 'Expected sales for the planning period.', whyItMatters: 'Higher planned sales need more inventory support.' },
          { name: 'Planned ending inventory', meaning: 'Target stock at period end.', whyItMatters: 'Ensures you do not end the month empty or overstocked.' },
          { name: 'Beginning inventory', meaning: 'Stock at start of period.', whyItMatters: 'Existing stock reduces how much new buying is needed.' },
          { name: 'On-order', meaning: 'Stock already ordered but not received.', whyItMatters: 'On-order consumes OTB even if not physically in warehouse yet.' },
        ],
        scenario: 'Plan sales ₹10L, planned ending stock ₹6L, beginning stock ₹4L, on-order ₹3L. OTB = ₹9L. If actual sales trend falls to ₹7L, buying should be reduced or delayed.',
        calculation: 'OTB = Planned Sales + Planned Ending Inventory - Beginning Inventory - On-order = 10 + 6 - 4 - 3 = ₹9L.',
        excel: '=PlannedSales+PlannedEOM-BOM-OnOrder. Add reforecast column: =RevisedSales+RevisedEOM-BOM-OnOrder.',
        mistakes: ['Ignoring on-order stock.', 'Buying to last month sales without checking inventory already arriving.', 'Not revising OTB after actual sales change.', 'Using MRP value and cost value inconsistently.'],
        interviewTrap: 'If interviewer says “sales are high, buy more?”, answer: “I would reforecast OTB after checking WOS, lead time, margin, returns, on-order and season remaining.”',
        masteryCheck: ['Break each OTB parameter.', 'Explain why on-order reduces OTB.', 'Explain how markdown affects future buying budget.'],
      },
      {
        title: 'Forecasting and markdown decisions',
        beginner: 'Forecasting estimates future sales. Markdown decisions reduce price to increase sell-through or liquidate stock.',
        operator: 'Forecasts must combine history, trend, seasonality, campaigns, stock availability and price. Markdown should be staged, not panicked, and measured by contribution recovery.',
        parameters: [
          { name: 'Baseline sales', meaning: 'Normal weekly sales without special events.', whyItMatters: 'Starting point before applying uplift or decline.' },
          { name: 'Seasonality factor', meaning: 'Multiplier for seasonal demand changes.', whyItMatters: 'Linen rises in summer; jackets rise in winter.' },
          { name: 'Campaign uplift', meaning: 'Expected extra sales from marketplace sale or marketing.', whyItMatters: 'Prevents understock during events but can overestimate if repeated too often.' },
          { name: 'Markdown depth', meaning: 'Discount level applied.', whyItMatters: 'Higher markdown may clear stock but reduce margin and brand value.' },
        ],
        scenario: 'Printed shirts have 90+ days aging and 18 WOS. Instead of one sudden 60% discount, test staged markdown: 25%, then 35%, then event liquidation if response is weak.',
        calculation: 'Forecast = baseline weekly sales 80 × seasonality 1.2 × campaign uplift 1.5 = 144 units/week.',
        excel: '=BaselineWeeklySales*SeasonalityFactor*CampaignUplift. Markdown contribution simulation: =NewASP-Cost-Commission-Logistics-ReturnProvision.',
        mistakes: ['Forecasting from a stockout period as if demand was low.', 'Ignoring season end.', 'Markdowning bestsellers unnecessarily.', 'Not measuring post-markdown margin.'],
        interviewTrap: 'If slow stock exists, do not immediately say discount. First diagnose traffic, conversion, size mix, pricing, listing, reviews, channel fit and seasonality.',
        masteryCheck: ['Explain baseline vs uplift.', 'Calculate forecast with multipliers.', 'Defend a staged markdown plan.'],
      },
    ],
  },
  {
    title: 'Phase 6 · ERP and omnichannel operations',
    outcome: 'Understand how LOGIC ERP-like workflows convert production and warehouse events into reliable stock visibility.',
    deepTopics: [
      {
        title: 'BOM, procurement, production tracking and GRN',
        beginner: 'ERP is the system that records what is planned, purchased, produced, received, sold and returned. BOM means Bill of Materials — everything needed to make one product.',
        operator: 'Bad ERP discipline causes wrong cost, wrong stock, delayed listings, overselling and poor decisions. Merchandisers must understand operational documents even if they do not create all of them.',
        parameters: [
          { name: 'BOM', meaning: 'Fabric, buttons, labels, thread, fusing, tags and packaging needed per garment.', whyItMatters: 'Controls cost and procurement quantity. Wrong BOM creates shortage or excess material.' },
          { name: 'PO', meaning: 'Purchase order issued to vendor/factory.', whyItMatters: 'Formal commitment for quantity, cost and delivery date.' },
          { name: 'Production status', meaning: 'Cutting, stitching, finishing, packing and dispatch progress.', whyItMatters: 'Shows if launch/replenishment will be delayed.' },
          { name: 'GRN', meaning: 'Goods Received Note when warehouse receives stock.', whyItMatters: 'Stock usually becomes ERP-visible after GRN and QC.' },
        ],
        scenario: 'A reorder is approved, but buttons are short because BOM counted 7 instead of 8 buttons per shirt. Production delays by 5 days and the bestseller stocks out on Myntra.',
        calculation: 'For 1,000 shirts needing 8 buttons each plus 3% wastage: 1,000 × 8 × 1.03 = 8,240 buttons required.',
        excel: 'Material requirement = OrderQty*ConsumptionPerPiece*(1+Wastage%). Track PO Qty, Received Qty, Pending Qty and Expected Date.',
        mistakes: ['Thinking ERP is only stock count.', 'Ignoring BOM impact on costing.', 'Not tracking pending PO dates.', 'Assuming received stock is saleable before QC.'],
        interviewTrap: 'If asked “why ERP matters?”, explain it connects BOM, procurement, production, GRN, warehouse, stock visibility, sales, returns and planning data.',
        masteryCheck: ['Explain BOM using a shirt example.', 'Explain PO vs GRN.', 'Explain how production delay affects WOS.'],
      },
      {
        title: 'Omnichannel inventory synchronization',
        beginner: 'Inventory sync means every channel should know the latest available stock so the brand does not sell what it cannot ship.',
        operator: 'In omnichannel retail, available-to-promise stock must consider physical stock, reserved stock, safety buffer, damaged stock, pending orders, channel allocation and sync delay.',
        parameters: [
          { name: 'ATP / available-to-promise', meaning: 'Stock that can safely be promised to customers.', whyItMatters: 'Prevents overselling and cancellations.' },
          { name: 'Safety buffer', meaning: 'Stock kept hidden from channels to absorb mismatch or high velocity.', whyItMatters: 'Reduces oversell risk on fast-moving SKUs.' },
          { name: 'Sync frequency', meaning: 'How often ERP/channel inventory updates.', whyItMatters: 'Slow sync increases mismatch risk.' },
          { name: 'Allocation rule', meaning: 'How stock is assigned to channels.', whyItMatters: 'Ensures strategic channels do not get starved.' },
        ],
        scenario: 'One size L shirt has 12 physical units. 5 are reserved, 1 is damaged, buffer is 2. ATP = 4. If marketplace shows 12, overselling is likely.',
        calculation: 'ATP = Physical 12 - Reserved 5 - Damaged 1 - Buffer 2 = 4 units.',
        excel: '=PhysicalStock-Reserved-Damaged-Buffer. Channel stock cap: =MIN(ATP,ChannelAllocation).',
        mistakes: ['Publishing total physical stock to all channels.', 'Not using buffers for fast movers.', 'Ignoring sync failures.', 'Not separating saleable and unsaleable returns.'],
        interviewTrap: 'When asked about marketplace cancellations, mention stock sync, reserved orders, buffer, warehouse picking accuracy, returns QC and SKU mapping.',
        masteryCheck: ['Calculate ATP.', 'Explain overselling.', 'Explain why safety buffer exists.'],
      },
    ],
  },
  {
    title: 'Phase 7 · Quality assurance and return prevention',
    outcome: 'Connect fabric and garment quality parameters to customer returns, stock blocking and margin loss.',
    deepTopics: [
      {
        title: '4-point fabric system, AQL and garment defects',
        beginner: 'Quality assurance checks whether fabric and garments meet acceptable standards before they reach customers. Bad quality causes returns, bad reviews, blocked stock and margin loss.',
        operator: 'Merchandisers must read quality signals commercially. If a high-velocity style has shrinkage complaints, replenishment should pause until fabric batch and wash test are reviewed.',
        parameters: [
          { name: '4-point fabric inspection', meaning: 'Defects are assigned 1, 2, 3 or 4 points depending on severity/length.', whyItMatters: 'Helps accept or reject fabric rolls before production.' },
          { name: 'AQL', meaning: 'Acceptable Quality Limit sampling method for finished goods.', whyItMatters: 'Defines how many defects are acceptable in a batch sample.' },
          { name: 'Shrinkage', meaning: 'Fabric/garment size reduction after wash.', whyItMatters: 'Causes fit complaints and returns.' },
          { name: 'Measurement tolerance', meaning: 'Allowed deviation from size spec.', whyItMatters: 'Prevents inconsistent fit across sizes/batches.' },
        ],
        scenario: 'Return reasons show “size changed after wash” for 12% of a cotton shirt batch. Merchandising should link returns to fabric lot, pause repeat buy and ask QA for shrinkage test results.',
        calculation: 'Return rate = Returns ÷ Sold Units. If 120 returns from 1,000 sold = 12%. If category norm is 6%, this SKU is double the expected risk.',
        excel: 'Pivot return reasons by SKU, size and batch. Flag: =IF(ReturnRate>CategoryNorm*1.5,"QA risk","Normal").',
        mistakes: ['Treating return rate as only a customer issue.', 'Not linking defects to batch/vendor.', 'Reselling damaged returns.', 'Ignoring shade variation and measurement tolerance.'],
        interviewTrap: 'If asked about QA, do not only define AQL. Explain business impact: returns, reviews, blocked inventory, markdowns, vendor claims and repeat-order decisions.',
        masteryCheck: ['Explain 4-point system simply.', 'Explain AQL in business language.', 'Explain how shrinkage affects merchandising.'],
      },
    ],
  },
  {
    title: 'Phase 8 · Strategic merchandising decisions',
    outcome: 'Think like an owner: balance margin, volume, cash recovery, brand value, channel strategy and operational capacity.',
    deepTopics: [
      {
        title: 'Margin vs volume, liquidation and pricing tradeoffs',
        beginner: 'Selling more is not always better. A lower-volume product with strong margin and low returns may be healthier than a high-volume product that loses money.',
        operator: 'Every action has tradeoffs: discount clears stock but reduces margin; protecting D2C stock improves contribution but may reduce marketplace visibility; liquidation recovers cash but can hurt brand perception.',
        parameters: [
          { name: 'Volume', meaning: 'Units sold.', whyItMatters: 'Drives revenue and stock clearance but not automatically profit.' },
          { name: 'Contribution margin', meaning: 'Money left after direct costs per unit.', whyItMatters: 'Shows whether a sale helps the business.' },
          { name: 'Cash recovery', meaning: 'How much blocked inventory cash can be recovered.', whyItMatters: 'Important for aged stock and new-season buying.' },
          { name: 'Brand price perception', meaning: 'Customer belief about normal price/discount level.', whyItMatters: 'Constant deep discounts train customers to avoid full-price buying.' },
        ],
        scenario: 'A 120-day-old printed shirt with 18 WOS may be liquidated in a marketplace event. A fresh bestseller with 2 WOS should not be discounted heavily; protect it for high-margin channels.',
        calculation: 'If contribution at 25% discount is ₹500 and at 50% discount is ₹120, the extra units from deeper discount must justify ₹380 lost per unit.',
        excel: 'Scenario table with Discount %, ASP, Expected Units, Contribution/Unit, Total Contribution, Ending Stock. Pick the action that balances cash and margin.',
        mistakes: ['Choosing highest revenue scenario without contribution.', 'Discounting fresh winners.', 'Holding deadstock too long because of sunk cost.', 'Ignoring channel-specific customer behavior.'],
        interviewTrap: 'For “would you sell more at lower margin?”, answer “depends” and list stock age, season, cash need, contribution, customer acquisition, brand impact and channel strategy.',
        masteryCheck: ['Compare two discount scenarios.', 'Explain when liquidation is correct.', 'Explain why margin and volume must be viewed together.'],
      },
    ],
  },
]

const candidateGaps = [
  'They know formulas but cannot explain numerator, denominator, period and action.',
  'They analyze total stock but not size-wise and channel-wise saleable stock.',
  'They recommend discounts before diagnosing traffic, conversion, size mix, price, listing, reviews and seasonality.',
  'They ignore returns, marketplace commission and logistics while discussing profitability.',
  'They do not understand ERP movement: PO, GRN, reserved stock, returns QC and channel sync.',
]

const sourceLibrary = [
  {
    name: 'The Bear House official store',
    url: 'https://thebearhouse.com/',
    teaches: 'Menswear category context, product language and how a D2C fashion storefront presents shirts, trousers, new arrivals and offers.',
    applied: 'Examples use realistic Bear House-style menswear SKUs such as checked shirts, linen shirts, chinos, overshirts and size curves.',
  },
  {
    name: 'LOGIC ERP',
    url: 'https://www.logicerp.com/',
    teaches: 'Integrated ERP thinking across retail POS, distribution and manufacturing workflows.',
    applied: 'ERP lessons connect BOM, procurement, production, GRN, warehouse stock, sales, returns and omnichannel stock visibility.',
  },
  {
    name: 'Shopify sell-through rate guide',
    url: 'https://www.shopify.com/blog/sell-through-rate',
    teaches: 'Sell-through rate as an inventory health and profitability metric.',
    applied: 'ST% is taught as units sold divided by opening/bought stock, then expanded into net ST%, time-period interpretation and action triggers.',
  },
  {
    name: 'Retail Dogma OTB guide',
    url: 'https://www.retaildogma.com/otb-retail/',
    teaches: 'Merchant-oriented Open-to-Buy planning and buying control.',
    applied: 'OTB lesson breaks planned sales, planned ending inventory, beginning inventory and on-order into a live buying budget.',
  },
  {
    name: 'Retalon GMROI guide',
    url: 'https://retalon.com/blog/what-is-gmroi',
    teaches: 'GMROI as gross margin return on inventory investment.',
    applied: 'GMROI lesson compares categories by margin productivity, not just revenue or sell-through.',
  },
  {
    name: 'QIMA AQL guide',
    url: 'https://www.qima.com/aql-acceptable-quality-limit',
    teaches: 'Acceptable Quality Limit sampling and inspection decision logic.',
    applied: 'QA lesson explains AQL as a batch acceptance tool that protects customers, reviews, returns and vendor accountability.',
  },
  {
    name: 'Textile Blog 4-point fabric inspection',
    url: 'https://www.textileblog.com/4-point-system-for-fabric-inspection-with-example/',
    teaches: '4-point fabric defect grading used in textile inspection.',
    applied: 'Fabric QA lesson links defect points, shrinkage and shade variation to blocked stock and replenishment decisions.',
  },
]

const formulaDictionary = [
  {
    name: 'Sell-through %',
    formula: 'Units sold ÷ opening stock × 100',
    parameterBreakdown: ['Units sold = demand converted into orders', 'Opening stock = opportunity to sell', 'Time period = speed context', 'Return adjustment = quality of sales'],
    decision: 'High ST% + low WOS can mean replenish. Low ST% + high stock age can mean diagnose or markdown.',
  },
  {
    name: 'Weeks of Supply',
    formula: 'Saleable closing stock ÷ average weekly sales',
    parameterBreakdown: ['Saleable stock excludes reserved/damaged/blocked units', 'Average weekly sales should match current trend', 'Lead time tells if WOS is safe or risky'],
    decision: 'If WOS is below lead time, protect stock and start replenishment or substitute planning.',
  },
  {
    name: 'Contribution',
    formula: 'ASP - cost - commission - logistics - return provision',
    parameterBreakdown: ['ASP = actual selling price', 'Cost = product cost', 'Commission/logistics = channel cost', 'Return provision = expected reverse cost'],
    decision: 'Use contribution to decide D2C vs marketplace allocation and discount depth.',
  },
  {
    name: 'OTB',
    formula: 'Planned sales + planned ending inventory - beginning inventory - on-order',
    parameterBreakdown: ['Planned sales = demand target', 'Ending inventory = desired closing cover', 'Beginning inventory = stock already owned', 'On-order = stock already committed'],
    decision: 'Positive OTB means buying room; negative OTB means slow down, cancel, delay or liquidate before buying more.',
  },
  {
    name: 'GMROI',
    formula: 'Gross margin ÷ average inventory cost',
    parameterBreakdown: ['Gross margin = profit generated by merchandise', 'Average inventory cost = capital tied in stock', 'Ratio = productivity of inventory investment'],
    decision: 'Use GMROI to compare categories that have different revenue, margin and stock investment levels.',
  },
  {
    name: 'Available-to-promise',
    formula: 'Physical stock - reserved - damaged/blocked - safety buffer',
    parameterBreakdown: ['Physical stock = warehouse count', 'Reserved = open orders', 'Damaged/blocked = not saleable', 'Buffer = oversell protection'],
    decision: 'Publish ATP, not raw warehouse stock, to marketplaces and D2C channels.',
  },
]

type MockCase = {
  id: string
  title: string
  difficulty: 'Foundation' | 'Interview' | 'Advanced'
  prompt: string
  data: string[]
  expectedCalculations: string[]
  rubric: { label: string; keywords: string[]; why: string }[]
  modelAnswer: string
}

const mockCases: MockCase[] = [
  {
    id: 'bestseller-stockout',
    title: 'Bestseller stockout risk',
    difficulty: 'Foundation',
    prompt: 'A navy casual shirt launched 1,000 units. In 2 weeks it sold 650 units. Closing stock is 350 units. Average weekly sales are 325 units. Replenishment lead time is 45 days. What should the merchandiser recommend?',
    data: ['Opening stock: 1,000', 'Sales: 650 in 2 weeks', 'Closing stock: 350', 'Weekly sales: 325', 'Lead time: 45 days / around 6.4 weeks'],
    expectedCalculations: ['ST% = 650 ÷ 1,000 × 100 = 65%', 'WOS = 350 ÷ 325 = 1.08 weeks', 'Lead time gap = 6.4 - 1.08 = about 5.3 uncovered weeks'],
    rubric: [
      { label: 'Calculates sell-through and WOS', keywords: ['65', 'sell-through', 'st%', '1.08', 'wos'], why: 'A merchandiser must quantify demand speed before recommending action.' },
      { label: 'Compares WOS with lead time', keywords: ['lead time', '6.4', 'stockout', 'gap'], why: 'The business risk is not just high sales; it is running out before replenishment arrives.' },
      { label: 'Gives operational actions', keywords: ['replenish', 'po', 'fabric', 'allocate', 'discount', 'd2c', 'myntra'], why: 'Strong answers convert metrics into PO, allocation and pricing actions.' },
      { label: 'Mentions extra checks', keywords: ['size', 'return', 'margin', 'channel', 'reviews'], why: 'Reordering without size, margin and quality checks can repeat bad demand.' },
    ],
    modelAnswer: 'This is a strong seller but an urgent stockout risk. ST% is 65%. WOS is 350 ÷ 325 = 1.08 weeks, while lead time is around 6.4 weeks, so the style will stock out long before replenishment arrives. I would raise an urgent repeat PO after checking fabric and vendor capacity, reduce unnecessary discounting, allocate remaining stock to the highest contribution channels, check size-wise availability, and prepare substitute products. Before final reorder quantity, I would review returns, reviews, margin and channel-wise demand quality.',
  },
  {
    id: 'marketplace-profitability',
    title: 'Marketplace profitability decision',
    difficulty: 'Interview',
    prompt: 'A linen shirt sells 600 units on Myntra at ASP ₹1,399 and 350 units on D2C at ASP ₹1,899. Cost is ₹750. Myntra commission/logistics/return provision totals ₹570 per unit. D2C logistics/return provision totals ₹200 per unit. Which channel should receive the next 500 scarce units and why?',
    data: ['Myntra ASP: ₹1,399; cost: ₹750; channel costs: ₹570', 'D2C ASP: ₹1,899; cost: ₹750; channel costs: ₹200', 'Scarce stock to allocate: 500 units'],
    expectedCalculations: ['Myntra contribution = 1,399 - 750 - 570 = ₹79', 'D2C contribution = 1,899 - 750 - 200 = ₹949', 'D2C earns ₹870 more contribution per unit'],
    rubric: [
      { label: 'Calculates channel contribution', keywords: ['79', '949', 'contribution', 'asp', 'commission'], why: 'Revenue comparison is misleading without contribution.' },
      { label: 'Recognizes scarcity allocation', keywords: ['scarce', 'allocate', 'd2c', 'protect', 'margin'], why: 'When stock is scarce, allocation should protect profitable demand.' },
      { label: 'Avoids one-sided answer', keywords: ['visibility', 'campaign', 'myntra', 'customer acquisition', 'liquidation'], why: 'Marketplace may still matter for discovery, commitments or liquidation.' },
      { label: 'Mentions further checks', keywords: ['return', 'size', 'velocity', 'season', 'stock'], why: 'Final allocation needs operational checks beyond one margin calculation.' },
    ],
    modelAnswer: 'D2C should receive priority because contribution is much higher. Myntra contribution is ₹1,399 - ₹750 - ₹570 = ₹79. D2C contribution is ₹1,899 - ₹750 - ₹200 = ₹949, so D2C gives ₹870 more per unit. I would protect most scarce stock for D2C, but keep a controlled quantity for Myntra only if there is a strategic campaign, visibility benefit or marketplace commitment. I would also check size mix, return rate, weekly velocity and seasonality before final allocation.',
  },
  {
    id: 'erp-reconciliation',
    title: 'ERP vs marketplace stock mismatch',
    difficulty: 'Advanced',
    prompt: 'ERP shows 500 units for a shirt, warehouse count shows 485 and Myntra shows 420. Explain possible causes and the exact reconciliation logic you would use before correcting stock.',
    data: ['ERP stock: 500', 'Warehouse physical count: 485', 'Myntra available stock: 420', 'Possible hidden movements: reserved orders, damaged returns, failed sync, pending GRN, manual adjustments'],
    expectedCalculations: ['Expected closing = opening + GRN + saleable returns - sales - damaged - reserved - transfers', 'Difference = system stock - expected closing', 'Available-to-promise = physical - reserved - damaged/blocked - buffer'],
    rubric: [
      { label: 'Uses reconciliation equation', keywords: ['opening', 'grn', 'returns', 'sales', 'damaged', 'reserved', 'transfers'], why: 'A strong operator rebuilds stock movement instead of guessing.' },
      { label: 'Separates physical, ERP and channel stock', keywords: ['physical', 'erp', 'myntra', 'sync', 'mapping'], why: 'Each system can differ for legitimate operational reasons.' },
      { label: 'Mentions saleable vs unsaleable stock', keywords: ['saleable', 'qc', 'damaged', 'blocked', 'return'], why: 'Returned or damaged stock should not be pushed online blindly.' },
      { label: 'Gives correction workflow', keywords: ['audit', 'adjust', 'root cause', 'update', 'prevent'], why: 'Interviewers want process discipline, not only cause listing.' },
    ],
    modelAnswer: 'I would not directly overwrite stock. I would reconcile stock movement: opening + GRN + saleable returns - sales - damaged - reserved - transfers/manual adjustments = expected closing. Then I would compare expected closing with ERP, physical warehouse count and Myntra stock. Causes may include reserved Myntra orders, damaged returns not blocked correctly, pending GRN, failed inventory sync, SKU mapping issue, cancelled orders not released or manual adjustments. I would separate physical stock from available-to-promise: physical - reserved - damaged/blocked - buffer. After identifying the root cause, I would correct ERP/channel stock and document the adjustment to prevent repeat mismatch.',
  },
  {
    id: 'slow-mover-markdown',
    title: 'Slow mover markdown decision',
    difficulty: 'Interview',
    prompt: 'A printed shirt has opening stock 1,200, sold 120 in 30 days and closing stock 1,080. It is 75 days old. The manager asks whether to immediately discount 50%. What do you recommend?',
    data: ['Opening stock: 1,200', '30-day sales: 120', 'Closing stock: 1,080', 'Age: 75 days', 'Proposed markdown: 50%'],
    expectedCalculations: ['ST% = 120 ÷ 1,200 × 100 = 10%', 'Weekly sales = 120 ÷ 4.3 = about 28 units/week', 'WOS = 1,080 ÷ 28 = about 38.6 weeks'],
    rubric: [
      { label: 'Calculates poor velocity', keywords: ['10', '38', 'wos', 'slow', 'age'], why: 'The stock is clearly risky, but action still needs diagnosis.' },
      { label: 'Diagnoses before discounting', keywords: ['traffic', 'conversion', 'price', 'listing', 'image', 'review', 'size'], why: 'Discount is not the first automatic answer.' },
      { label: 'Suggests staged actions', keywords: ['staged', 'markdown', 'transfer', 'campaign', 'reallocate', 'liquidation'], why: 'Good markdown management protects margin while clearing risk.' },
      { label: 'Connects stock age and cash', keywords: ['75', 'cash', 'deadstock', 'season', 'warehouse'], why: 'Aging inventory affects cash flow and future buying.' },
    ],
    modelAnswer: 'The style is risky: ST% is only 10%, weekly sales are about 28 units and WOS is around 38.6 weeks. At 75 days old, it needs action, but I would not immediately jump to 50% discount. First I would diagnose traffic, conversion, listing images, price vs competitors, size availability, reviews, channel performance and season fit. If product and listing are fine but demand is weak, I would use staged markdowns, transfer stock to stronger channels, include it in marketplace campaigns and set a liquidation plan if it crosses 90 days. I would also avoid repeating similar prints in the next buy.',
  },
]


type TopicQuestion = {
  question: string
  answerGuide: string
}

type TopicQuestionGroup = {
  id: string
  topic: string
  questions: TopicQuestion[]
}

const topicQuestionBank: TopicQuestionGroup[] = [
  {
    id: 'fundamentals',
    topic: 'Retail fundamentals and omnichannel retail',
    questions: [
      {
        question: 'Explain the full product journey from design idea to customer delivery.',
        answerGuide: 'Mention range planning, sourcing, costing, production, GRN, listing, allocation, order fulfillment, returns and ERP updates.',
      },
      {
        question: 'Why is inventory called cash in physical form?',
        answerGuide: 'Explain cash blockage, stock aging, markdown risk, warehouse space and reinvestment into fresh season stock.',
      },
      {
        question: 'How is D2C different from Myntra, Ajio, Amazon and offline retail?',
        answerGuide: 'Compare margin, commission, traffic, returns, customer data, discount pressure and operational control.',
      },
      {
        question: 'A style sells well on D2C but poorly on Amazon. What will you check?',
        answerGuide: 'Check price, images, reviews, search visibility, customer intent, size availability, competitors, delivery promise and returns.',
      },
      {
        question: 'Why is total sales not enough to judge a product?',
        answerGuide: 'Break sales by margin, ASP, discount, return rate, channel, size, stock availability and time period.',
      },
      {
        question: 'What is the difference between style, SKU, option and barcode?',
        answerGuide: 'Define hierarchy: style/design, option/color, SKU=size-color saleable unit, barcode/scannable identifier.',
      },
      {
        question: 'How can a brand have stock but still lose sales?',
        answerGuide: 'Explain broken sizes, wrong channel allocation, blocked stock, sync delays and unavailable key sizes.',
      },
      {
        question: 'What does a merchandiser check in a daily sales report?',
        answerGuide: 'Mention sales, ST%, WOS, stock age, channel split, margin, returns, size availability and action flags.',
      },
      {
        question: 'Why are returns especially important in fashion?',
        answerGuide: 'Explain fit issues, reverse logistics, damaged returns, refund delay, margin erosion and resale QC.',
      },
      {
        question: 'How do marketplace campaigns affect merchandising decisions?',
        answerGuide: 'Mention uplift, discount funding, visibility, stock reservation, margin impact and post-event sell-through.',
      },
      {
        question: 'What is stock aging and why does it matter?',
        answerGuide: 'Define age buckets and connect old stock with markdowns, cash blockage, season mismatch and deadstock risk.',
      },
      {
        question: 'How should a merchandiser think about launch quantities?',
        answerGuide: 'Balance demand forecast, category history, size curve, lead time, fabric MOQ, budget and risk appetite.',
      },
      {
        question: 'Why should scarce stock not be split equally across channels?',
        answerGuide: 'Allocation should reflect contribution, velocity, campaign commitments, customer fit and strategic priority.',
      },
      {
        question: 'What does “saleable inventory” mean?',
        answerGuide: 'Explain stock available after excluding damaged, reserved, QC hold, returns pending inspection and safety buffer.',
      },
      {
        question: 'How can customer reviews affect buying decisions?',
        answerGuide: 'Reviews reveal fit, fabric, shrinkage, color mismatch and listing issues that affect repeat orders.',
      },
      {
        question: 'What are signs of a product-market fit issue?',
        answerGuide: 'Low traffic conversion, weak ST%, high WOS, poor reviews, high returns and competitor outperformance.',
      },
      {
        question: 'What are signs of an operations issue rather than a product issue?',
        answerGuide: 'Stock mismatch, listing delay, wrong size mapping, sync failure, late GRN or warehouse picking errors.',
      },
      {
        question: 'Why does warehouse capacity matter to merchandising?',
        answerGuide: 'Old stock consumes space, slows operations and blocks new-season inventory flow.',
      },
      {
        question: 'What is the difference between gross revenue and profitable sales?',
        answerGuide: 'Gross revenue ignores discount, cost, commission, logistics, returns and contribution.',
      },
      {
        question: 'Give a strong interview definition of merchandising.',
        answerGuide: 'Say merchandising plans, buys, allocates and controls inventory to maximize profitable sales while reducing stockout, deadstock and margin risk.',
      },
    ],
  },
  {
    id: 'retail-math',
    topic: 'Retail math mastery',
    questions: [
      {
        question: 'Calculate ST% if opening stock is 800 and sales are 240.',
        answerGuide: 'ST% = 240 ÷ 800 × 100 = 30%. Then interpret using period, plan, discount and returns.',
      },
      {
        question: 'Calculate WOS if closing stock is 560 and weekly sales are 60.',
        answerGuide: 'WOS = 560 ÷ 60 = 9.33 weeks. Compare with lead time and season remaining.',
      },
      {
        question: 'What is the difference between gross ST% and net ST%?',
        answerGuide: 'Gross uses sold units; net subtracts returns/cancellations to reflect quality of demand.',
      },
      {
        question: 'Why is ST% meaningless without time period?',
        answerGuide: '30% in one week is strong; 30% in 90 days may be weak. Time creates velocity context.',
      },
      {
        question: 'Break down the WOS formula parameter by parameter.',
        answerGuide: 'Saleable closing stock divided by average weekly sales; exclude blocked/damaged/reserved stock.',
      },
      {
        question: 'Calculate contribution: ASP ₹1,599, cost ₹650, commission 30%, return provision ₹100.',
        answerGuide: 'Commission = ₹479.70. Contribution = 1,599 - 650 - 479.70 - 100 = ₹369.30 before other costs.',
      },
      {
        question: 'What is IMU and why can it mislead?',
        answerGuide: 'IMU = (MRP-cost)/MRP. It ignores markdowns, commission, logistics, returns and actual ASP.',
      },
      {
        question: 'Calculate markdown from ₹2,499 to ₹1,499.',
        answerGuide: 'Markdown % = (2,499-1,499)/2,499 = about 40%.',
      },
      {
        question: 'What is maintained margin?',
        answerGuide: 'Actual margin retained after markdowns and real selling conditions, closer to business reality than IMU.',
      },
      {
        question: 'What is GMROI?',
        answerGuide: 'Gross margin divided by average inventory cost; shows margin generated per rupee invested in inventory.',
      },
      {
        question: 'Why use weighted ASP instead of simple average ASP?',
        answerGuide: 'High-volume SKUs should influence ASP more than low-volume SKUs; use SUMPRODUCT units × ASP / total units.',
      },
      {
        question: 'What does stock-to-sales ratio indicate?',
        answerGuide: 'Whether inventory level is balanced with sales; high can signal overstock, low can signal stockout risk.',
      },
      {
        question: 'How do returns affect retail math?',
        answerGuide: 'They reduce net sales, inflate logistics cost, reduce contribution and may reduce saleable stock.',
      },
      {
        question: 'A product has high ST% but negative contribution. What do you do?',
        answerGuide: 'Do not call it successful. Diagnose discount/channel cost and consider price, allocation or stopping repeat buys.',
      },
      {
        question: 'How do you calculate weekly sales from 30-day sales?',
        answerGuide: 'Divide by about 4.3 weeks, not exactly 4, for more accurate WOS.',
      },
      {
        question: 'What is the danger of average WOS?',
        answerGuide: 'Average can hide size-level stockouts and overstock. Calculate by size/channel for action.',
      },
      {
        question: 'When is low WOS good vs risky?',
        answerGuide: 'Good if replenishment is near or season ending; risky if lead time is longer than WOS.',
      },
      {
        question: 'How do you decide if 45% sell-through is good?',
        answerGuide: 'Compare with time period, category plan, margin, discount, returns, season and stock availability.',
      },
      {
        question: 'What should every retail metric end with?',
        answerGuide: 'A decision: replenish, markdown, reallocate, hold, diagnose, block or stop buying.',
      },
      {
        question: 'Explain why sales volume and profit can move in opposite directions.',
        answerGuide: 'Discounts and channel costs can increase units but reduce contribution per unit.',
      },
    ],
  },
  {
    id: 'excel',
    topic: 'Excel for merchandising',
    questions: [
      {
        question: 'Write a SUMIFS use case for daily sales.',
        answerGuide: 'Use SUMIFS to total units by SKU, channel and date range from raw sales data.',
      },
      {
        question: 'What does XLOOKUP solve in a merchandising file?',
        answerGuide: 'It pulls category, cost, MRP, vendor or launch date from SKU master into sales/stock files.',
      },
      {
        question: 'When would you use INDEX MATCH instead of XLOOKUP?',
        answerGuide: 'For older Excel versions or flexible row/column matching across tables.',
      },
      {
        question: 'Create an IF flag for stockout risk.',
        answerGuide: 'Example: IF(WOS<LeadTimeWeeks,"Stockout risk","Monitor").',
      },
      {
        question: 'How do you calculate weighted ASP in Excel?',
        answerGuide: 'SUMPRODUCT(UnitsRange, ASPRange)/SUM(UnitsRange).',
      },
      {
        question: 'What should a merchandising pivot table include?',
        answerGuide: 'Rows SKU/category/size, columns channel/week, values sales, stock, returns, contribution and WOS.',
      },
      {
        question: 'How do you clean inconsistent SKU codes?',
        answerGuide: 'Trim spaces, standardize hyphens/case, remove hidden characters and validate against SKU master.',
      },
      {
        question: 'How do you find missing SKUs in master data?',
        answerGuide: 'Use XLOOKUP with “Missing” default or conditional formatting on lookup errors.',
      },
      {
        question: 'What is an inventory reconciliation Excel equation?',
        answerGuide: 'Opening + GRN + saleable returns - sales - damaged - reserved - transfers = expected closing.',
      },
      {
        question: 'How do you validate a report before sending it?',
        answerGuide: 'Tie pivot totals to raw data totals, check duplicates, missing costs, date filters and formula ranges.',
      },
      {
        question: 'What dashboard KPIs should be visible?',
        answerGuide: 'Revenue, units, ST%, WOS, aging, returns, margin, contribution, stockout risk and markdown risk.',
      },
      {
        question: 'How can Excel help identify broken sizes?',
        answerGuide: 'Compare sales mix % vs stock mix % by size and flag large variance.',
      },
      {
        question: 'What is the danger of duplicate SKU rows?',
        answerGuide: 'They can double-count sales/stock or cause wrong lookup results.',
      },
      {
        question: 'How do you track aging inventory in Excel?',
        answerGuide: 'Use days since GRN/launch and bucket into 0-30, 31-60, 61-90, 90+.',
      },
      {
        question: 'How do you build an action flag?',
        answerGuide: 'Combine ST%, WOS, age, margin and returns into IF/IFS logic.',
      },
      {
        question: 'What is a common SUMIFS mistake?',
        answerGuide: 'Criteria range and sum range not same size, wrong date filters, or inconsistent SKU text.',
      },
      {
        question: 'Why should cost be in the SKU master?',
        answerGuide: 'Cost is needed for margin/contribution and should have a single source of truth.',
      },
      {
        question: 'How do you compare ERP and marketplace stock?',
        answerGuide: 'Create SKU-level table with ERP, channel, physical, reserved, damaged and variance columns.',
      },
      {
        question: 'What Excel output is useful in an interview task?',
        answerGuide: 'A clean summary table with formulas, action flags and concise recommendations.',
      },
      {
        question: 'How would you explain Excel proficiency to an interviewer?',
        answerGuide: 'Say you can clean raw sales/stock data, reconcile inventory, calculate KPIs and build decision dashboards.',
      },
    ],
  },
  {
    id: 'inventory',
    topic: 'Inventory and assortment planning',
    questions: [
      {
        question: 'Define breadth and depth with examples.',
        answerGuide: 'Breadth = number of styles/options; depth = units per style/size. Balance choice vs availability.',
      },
      {
        question: 'Why is size curve planning critical?',
        answerGuide: 'Wrong size ratios create stockouts in demand sizes and overstock in weak sizes.',
      },
      {
        question: 'How do you decide initial buy quantity?',
        answerGuide: 'Use history, forecast, category role, price, size curve, margin, lead time and risk.',
      },
      {
        question: 'What is SKU rationalization?',
        answerGuide: 'Reducing weak, duplicate or low-productivity SKUs to focus inventory on better performers.',
      },
      {
        question: 'How do you identify deadstock risk?',
        answerGuide: 'Low ST%, high WOS, high age, weak reviews, poor conversion and season ending.',
      },
      {
        question: 'What is replenishment logic?',
        answerGuide: 'Repeat buy based on velocity, WOS, lead time, margin, returns, season and stock quality.',
      },
      {
        question: 'Why not replenish every fast seller?',
        answerGuide: 'Fast sales may be discount-driven, one-time campaign-based, high-return or seasonal.',
      },
      {
        question: 'How do you handle broken size inventory?',
        answerGuide: 'Analyze size-level stock/sales, transfer stock, adjust future size ratio and avoid overbuying weak sizes.',
      },
      {
        question: 'What is safety stock?',
        answerGuide: 'Extra stock kept to absorb demand variation and replenishment delays.',
      },
      {
        question: 'How does lead time affect buying?',
        answerGuide: 'Long lead time requires earlier reorder decisions and stronger forecasting discipline.',
      },
      {
        question: 'What is option planning?',
        answerGuide: 'Planning color/fabric/fit variations inside a style family.',
      },
      {
        question: 'When should you discontinue a SKU?',
        answerGuide: 'Consistent low productivity, high returns, poor reviews, duplicate role or margin weakness.',
      },
      {
        question: 'How does MOQ affect assortment?',
        answerGuide: 'Minimum order quantity may force deeper buys; avoid too many options if MOQ creates overstock.',
      },
      {
        question: 'How do you use past sales in assortment planning?',
        answerGuide: 'Identify winning categories/colors/fits/sizes, but adjust for season, trend and stock availability.',
      },
      {
        question: 'What is the danger of too much breadth?',
        answerGuide: 'Tiny depth per style, stockouts, operational complexity and weak read on demand.',
      },
      {
        question: 'What is the danger of too much depth?',
        answerGuide: 'Large cash blockage if demand is wrong and higher markdown risk.',
      },
      {
        question: 'How do you plan newness?',
        answerGuide: 'Balance proven basics with controlled experiments; test before scaling unproven trends.',
      },
      {
        question: 'How do returns influence assortment?',
        answerGuide: 'High-return fits/fabrics should be corrected or reduced in future buys.',
      },
      {
        question: 'How do you prioritize replenishment?',
        answerGuide: 'Prioritize high contribution, low return, high velocity, healthy size mix and long remaining season.',
      },
      {
        question: 'What is a strong assortment interview answer?',
        answerGuide: 'Mention customer, category role, price architecture, size curve, channel, margin, lead time and risk.',
      },
    ],
  },
  {
    id: 'otb',
    topic: 'OTB, forecasting and markdowns',
    questions: [
      {
        question: 'Write the OTB formula.',
        answerGuide: 'OTB = planned sales + planned ending inventory - beginning inventory - on-order.',
      },
      {
        question: 'Why does on-order reduce OTB?',
        answerGuide: 'It is already committed inventory even if not yet physically received.',
      },
      {
        question: 'How do actual sales affect OTB?',
        answerGuide: 'Overperformance may create buying room; underperformance should reduce/delay buys.',
      },
      {
        question: 'What is planned ending inventory?',
        answerGuide: 'Target closing stock needed to support next period without overstocking.',
      },
      {
        question: 'What is dynamic reforecasting?',
        answerGuide: 'Updating sales and inventory plans based on actual performance and new information.',
      },
      {
        question: 'How do markdowns affect OTB?',
        answerGuide: 'Markdowns can clear units and recover cash but reduce margin and change future inventory needs.',
      },
      {
        question: 'How do you forecast weekly sales?',
        answerGuide: 'Use baseline sales, seasonality, campaigns, price changes and stock availability.',
      },
      {
        question: 'Why should stockout periods be adjusted in forecasts?',
        answerGuide: 'Low sales during stockout reflect lack of supply, not lack of demand.',
      },
      {
        question: 'What is campaign uplift?',
        answerGuide: 'Expected extra sales due to marketplace event, ads, email, influencer or discount.',
      },
      {
        question: 'How do you avoid overforecasting?',
        answerGuide: 'Separate one-time spikes from repeatable demand and check conversion, returns and stock depth.',
      },
      {
        question: 'When is markdown necessary?',
        answerGuide: 'Aged stock, high WOS, season end, poor conversion after diagnosis or cash/space pressure.',
      },
      {
        question: 'Why use staged markdowns?',
        answerGuide: 'To test elasticity and protect margin before deep liquidation.',
      },
      {
        question: 'What data is needed before a markdown decision?',
        answerGuide: 'ST%, WOS, age, margin, traffic, conversion, reviews, size mix, competitor price and season.',
      },
      {
        question: 'How do you simulate markdown impact?',
        answerGuide: 'Create scenario table with discount, ASP, expected units, contribution/unit and ending stock.',
      },
      {
        question: 'What is markdown elasticity?',
        answerGuide: 'How much unit demand increases when price decreases.',
      },
      {
        question: 'What is the risk of discounting fresh stock?',
        answerGuide: 'Margin loss, customer price training and unnecessary cannibalization.',
      },
      {
        question: 'How does OTB control cash flow?',
        answerGuide: 'It prevents buying more when existing and on-order stock already cover planned sales.',
      },
      {
        question: 'What is a negative OTB signal?',
        answerGuide: 'Inventory commitments exceed plan; slow buying, cancel/delay POs or liquidate old stock.',
      },
      {
        question: 'How do you present an OTB recommendation?',
        answerGuide: 'Show plan vs actual, revised forecast, stock cover, on-order, risk and requested buy amount.',
      },
      {
        question: 'What is a strong markdown interview answer?',
        answerGuide: 'Diagnose first, quantify risk, stage discounts, protect margin and prevent repeat buying mistakes.',
      },
    ],
  },
  {
    id: 'erp',
    topic: 'ERP and omnichannel operations',
    questions: [
      {
        question: 'What does ERP do in fashion retail?',
        answerGuide: 'Connects procurement, production, warehouse, stock, sales, returns and reporting.',
      },
      {
        question: 'What is BOM?',
        answerGuide: 'Bill of Materials: fabric, trims, labels, packaging and consumption per garment.',
      },
      {
        question: 'Why can wrong BOM damage merchandising?',
        answerGuide: 'Wrong consumption causes cost errors, procurement shortage/excess and production delay.',
      },
      {
        question: 'What is a PO?',
        answerGuide: 'Purchase order confirming vendor, quantity, cost, delivery date and terms.',
      },
      {
        question: 'What is GRN?',
        answerGuide: 'Goods Received Note when warehouse receives stock and ERP records inward movement.',
      },
      {
        question: 'What is reserved stock?',
        answerGuide: 'Stock blocked for orders not yet fully shipped/settled.',
      },
      {
        question: 'What is ATP?',
        answerGuide: 'Available-to-promise: stock safe to expose to sales channels.',
      },
      {
        question: 'Write ATP formula.',
        answerGuide: 'Physical stock - reserved - damaged/blocked - safety buffer.',
      },
      {
        question: 'Why do ERP and marketplace stock differ?',
        answerGuide: 'Reserved orders, sync delay, failed upload, returns, damaged stock, mapping or manual adjustment.',
      },
      {
        question: 'How do you reconcile stock mismatch?',
        answerGuide: 'Rebuild opening + inward + returns - sales - damaged - reserved - transfers.',
      },
      {
        question: 'What is warehouse bin logic?',
        answerGuide: 'Location mapping so pickers can find and count the correct SKU/size.',
      },
      {
        question: 'How do returns enter ERP?',
        answerGuide: 'Returned units need QC classification: saleable, damaged, repair, blocked or vendor claim.',
      },
      {
        question: 'What causes overselling?',
        answerGuide: 'Publishing raw stock, sync delay, no buffer, wrong reservations or duplicate channel allocation.',
      },
      {
        question: 'How can ERP help replenishment?',
        answerGuide: 'It gives stock, sales, WOS, pending PO and lead-time visibility.',
      },
      {
        question: 'Why is SKU mapping important?',
        answerGuide: 'Wrong mapping can sell wrong size/color or show incorrect stock online.',
      },
      {
        question: 'What should be checked before correcting stock?',
        answerGuide: 'Transaction history, physical count, reserved orders, returns QC, sync logs and adjustments.',
      },
      {
        question: 'How does production tracking matter?',
        answerGuide: 'It predicts whether replenishment arrives before stockout.',
      },
      {
        question: 'What is manual adjustment risk?',
        answerGuide: 'It fixes visible number but can hide root cause if not documented.',
      },
      {
        question: 'What ERP report helps merchandisers daily?',
        answerGuide: 'SKU-wise sales-stock-aging-return-channel report with pending PO and ATP.',
      },
      {
        question: 'What is a strong ERP interview answer?',
        answerGuide: 'Explain document flow: BOM → PO → production → GRN → QC → warehouse → channel sync → sales/returns.',
      },
    ],
  },
  {
    id: 'qa',
    topic: 'Quality assurance',
    questions: [
      {
        question: 'What is AQL?',
        answerGuide: 'Acceptable Quality Limit sampling method used to accept/reject production batches based on defects.',
      },
      {
        question: 'Explain AQL in business language.',
        answerGuide: 'It controls quality risk without checking every piece by defining acceptable defect limits.',
      },
      {
        question: 'What is the 4-point fabric inspection system?',
        answerGuide: 'Fabric defects are assigned penalty points based on severity/length to judge roll quality.',
      },
      {
        question: 'Why does shrinkage matter?',
        answerGuide: 'Shrinkage changes fit after wash, causing returns, bad reviews and blocked stock.',
      },
      {
        question: 'What are common fabric defects?',
        answerGuide: 'Holes, stains, shade variation, slubs, weaving defects, printing defects and contamination.',
      },
      {
        question: 'What are common garment defects?',
        answerGuide: 'Stitching issues, measurement deviation, loose buttons, broken seams, poor finishing and stains.',
      },
      {
        question: 'How do QA issues affect merchandising?',
        answerGuide: 'They increase returns, reduce saleable stock, delay launches and influence reorder decisions.',
      },
      {
        question: 'What should you do if return rate doubles category norm?',
        answerGuide: 'Analyze reasons by SKU/batch/size, block risky stock, involve QA/vendor and pause replenishment.',
      },
      {
        question: 'How do you track defect data?',
        answerGuide: 'Pivot returns/defects by SKU, batch, vendor, size and reason.',
      },
      {
        question: 'What is measurement tolerance?',
        answerGuide: 'Allowed difference from size spec; protects fit consistency.',
      },
      {
        question: 'Why should returned stock go through QC?',
        answerGuide: 'Not every returned unit is saleable; damaged pieces must be blocked or repaired.',
      },
      {
        question: 'How do fabric lots matter?',
        answerGuide: 'A defect can be batch-specific; identify lot before blaming entire style.',
      },
      {
        question: 'What QA data is needed before repeating a style?',
        answerGuide: 'Return rate, defect reasons, wash tests, shrinkage, vendor performance and customer reviews.',
      },
      {
        question: 'How does poor QA affect marketplace performance?',
        answerGuide: 'Bad reviews, higher returns, penalties and lower conversion.',
      },
      {
        question: 'What is vendor accountability?',
        answerGuide: 'Using defect evidence to claim, reject, repair or improve future production.',
      },
      {
        question: 'When should stock be blocked?',
        answerGuide: 'When defects, wrong labeling, shrinkage, unsafe quality or wrong SKU mapping make it unsaleable.',
      },
      {
        question: 'How do you explain 4-point system in an interview?',
        answerGuide: 'Say defects get points; total points determine whether fabric roll is acceptable for production.',
      },
      {
        question: 'How do you connect QA to margin?',
        answerGuide: 'Returns, repair, markdown, write-off and reverse logistics reduce contribution.',
      },
      {
        question: 'Why is pre-production testing important?',
        answerGuide: 'Catches fabric/shrinkage/construction issues before full production risk.',
      },
      {
        question: 'What is a strong QA interview answer?',
        answerGuide: 'Define method, connect to defects, returns, stock blocking, vendor action and reorder decisions.',
      },
    ],
  },
  {
    id: 'strategy',
    topic: 'Business and strategic thinking',
    questions: [
      {
        question: 'Why is highest sales not always best?',
        answerGuide: 'High sales can come from deep discounts, high returns or low contribution.',
      },
      {
        question: 'How do you compare margin vs volume?',
        answerGuide: 'Calculate contribution/unit and total contribution, then consider stock age and strategic goals.',
      },
      {
        question: 'When should stock be protected for D2C?',
        answerGuide: 'When D2C has higher contribution, limited stock, strong brand fit and customer data value.',
      },
      {
        question: 'When should marketplace liquidation be used?',
        answerGuide: 'For aged/high-WOS stock, season end, cash recovery or warehouse space pressure.',
      },
      {
        question: 'How do you decide pricing?',
        answerGuide: 'Use cost, target margin, competitor price, brand position, elasticity and channel economics.',
      },
      {
        question: 'What is price perception risk?',
        answerGuide: 'Customers learn to wait for discounts if brand discounts too often.',
      },
      {
        question: 'How do you handle a high-volume low-margin SKU?',
        answerGuide: 'Check strategic role; improve price/cost/channel mix or reduce future buy if unprofitable.',
      },
      {
        question: 'How do you handle a low-volume high-margin SKU?',
        answerGuide: 'Improve visibility/listing/channel fit before markdowning; check if niche premium role is acceptable.',
      },
      {
        question: 'What is inventory liquidation?',
        answerGuide: 'Selling slow/old stock quickly, often with markdown, to recover cash and space.',
      },
      {
        question: 'What is cannibalization?',
        answerGuide: 'One product’s sales reduce another similar product’s sales.',
      },
      {
        question: 'How do you allocate scarce inventory?',
        answerGuide: 'Prioritize contribution, velocity, commitments, customer fit, size availability and strategic channel.',
      },
      {
        question: 'How do you defend not discounting a bestseller?',
        answerGuide: 'Low WOS, strong demand, margin protection, delayed replenishment and brand value.',
      },
      {
        question: 'How do you defend discounting old stock?',
        answerGuide: 'High age/WOS, season end, cash recovery, warehouse pressure and weak demand after diagnosis.',
      },
      {
        question: 'What is customer acquisition tradeoff?',
        answerGuide: 'A low-margin sale may be acceptable if it brings valuable new customers, but must be measured.',
      },
      {
        question: 'How do operational constraints affect strategy?',
        answerGuide: 'Warehouse capacity, production lead time, ERP accuracy and vendor capacity limit ideal decisions.',
      },
      {
        question: 'What is a good executive summary format?',
        answerGuide: 'State issue, key numbers, risk, recommendation, expected impact and next checks.',
      },
      {
        question: 'How do you avoid repeating past mistakes?',
        answerGuide: 'Feed learnings into next assortment: size curve, fabric, vendor, price, channel and buy depth.',
      },
      {
        question: 'How do you balance brand and liquidation?',
        answerGuide: 'Liquidate discreetly/staged while protecting core bestsellers and price architecture.',
      },
      {
        question: 'What is an owner mindset in merchandising?',
        answerGuide: 'Care about cash, margin, customer experience, stock health and future buying flexibility.',
      },
      {
        question: 'What is a strong strategic interview answer?',
        answerGuide: 'Use numbers, tradeoffs, risks, action plan and what extra data would change the decision.',
      },
    ],
  },
]

const finalDrill = [
  'Opening stock 1,500; sales after 3 weeks 600; closing 900. Calculate ST%, weekly sales and WOS.',
  'ASP ₹1,599; cost ₹650; marketplace commission 30%; return provision ₹100. Calculate contribution per unit.',
  'If most remaining stock is S and XXL but demand is M/L/XL, explain why total WOS is misleading.',
  'If D2C contribution is ₹650 and marketplace contribution is ₹250, how do you allocate remaining 300 units?',
  'Give an interview-ready recommendation including reorder, allocation, markdown, ERP checks and extra data required.',
]

function App() {
  const [activeCaseId, setActiveCaseId] = useState(mockCases[0].id)
  const [activeQuestionTopicId, setActiveQuestionTopicId] = useState(topicQuestionBank[0].id)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})

  const activeCase = mockCases.find((item) => item.id === activeCaseId) || mockCases[0]
  const activeQuestionTopic = topicQuestionBank.find((item) => item.id === activeQuestionTopicId) || topicQuestionBank[0]
  const currentAnswer = answers[activeCase.id] || ''
  const normalizedAnswer = currentAnswer.toLowerCase()

  const review = useMemo(() => {
    const rubricResults = activeCase.rubric.map((item) => {
      const matched = item.keywords.filter((keyword) => normalizedAnswer.includes(keyword.toLowerCase()))
      return { ...item, matched, passed: matched.length > 0 }
    })
    const score = Math.round((rubricResults.filter((item) => item.passed).length / rubricResults.length) * 100)
    const wordCount = currentAnswer.trim() ? currentAnswer.trim().split(/\s+/).length : 0
    const calculationSignals = activeCase.expectedCalculations.filter((calc) => {
      const numbers = calc.match(/\d+(?:\.\d+)?/g) || []
      return numbers.some((number) => normalizedAnswer.includes(number))
    })
    const strengths = rubricResults.filter((item) => item.passed).map((item) => item.label)
    const gaps = rubricResults.filter((item) => !item.passed).map((item) => item.label)
    return { rubricResults, score, wordCount, calculationSignals, strengths, gaps }
  }, [activeCase, currentAnswer, normalizedAnswer])

  function updateAnswer(value: string) {
    setAnswers((prev) => ({ ...prev, [activeCase.id]: value }))
    setSubmitted((prev) => ({ ...prev, [activeCase.id]: false }))
  }

  function submitAnswer() {
    setSubmitted((prev) => ({ ...prev, [activeCase.id]: true }))
  }

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Deep mastery upgrade</p>
          <h1>The Bear House Merchandising Interview Trainer</h1>
          <p className="hero-copy">
            This version breaks down every concept like a real merchandising analyst: what each parameter means,
            why it matters, what can go wrong, how to calculate it in Excel and how to answer interview traps.
          </p>
          <div className="hero-actions">
            <a href="#curriculum">Study deep topics</a>
            <a href="#question-bank" className="secondary">Drill 160+ questions</a>
            <a href="#mock-practice" className="secondary">Attend mock interview</a>
          </div>
        </div>
        <aside className="case-card">
          <span>Core mental model</span>
          <h2>Do not report numbers. Convert numbers into actions.</h2>
          <p>Every metric must end with a decision: replenish, hold, reallocate, markdown, investigate, block stock or stop future buying.</p>
        </aside>
      </section>

      <section className="grid stats">
        <div><strong>8</strong><span>phases</span></div>
        <div><strong>15</strong><span>deep lessons</span></div>
        <div><strong>60+</strong><span>parameters decoded</span></div>
        <div><strong>160+</strong><span>topic questions</span></div>
      </section>

      <section className="section warning">
        <p className="eyebrow">Most candidates fail here</p>
        <h2>Skills interviewers test beyond textbook formulas</h2>
        <div className="cards five">
          {candidateGaps.map((gap) => <article className="metric" key={gap}>{gap}</article>)}
        </div>
      </section>

      <section className="section warning">
        <p className="eyebrow">Source-backed learning map</p>
        <h2>Sources researched and how their ideas are used</h2>
        <p className="goal">
          The app now uses credible learning sources as reference anchors, then converts them into original Bear House-style scenarios.
          This avoids shallow definitions and teaches how to use each concept in an actual merchandising meeting.
        </p>
        <div className="source-grid">
          {sourceLibrary.map((source) => (
            <article className="source-card" key={source.name}>
              <a href={source.url} target="_blank" rel="noreferrer">{source.name}</a>
              <p><b>Concept learned:</b> {source.teaches}</p>
              <p><b>How it is applied here:</b> {source.applied}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section warning">
        <p className="eyebrow">Formula parameter dictionary</p>
        <h2>Break down every metric before using it</h2>
        <div className="formula-grid">
          {formulaDictionary.map((item) => (
            <article className="formula-card" key={item.name}>
              <h3>{item.name}</h3>
              <p className="formula"><b>Formula:</b> {item.formula}</p>
              <h5>Parameter meaning</h5>
              <ul>{item.parameterBreakdown.map((param) => <li key={param}>{param}</li>)}</ul>
              <p><b>Decision use:</b> {item.decision}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="curriculum" className="section">
        <p className="eyebrow">Full curriculum</p>
        <h2>Deep explanations, parameters, calculations and traps</h2>
        <div className="phase-list">
          {phases.map((phase) => (
            <article className="phase" key={phase.title}>
              <h3>{phase.title}</h3>
              <p className="goal"><b>Mastery outcome:</b> {phase.outcome}</p>
              <div className="topic-list">
                {phase.deepTopics.map((topic) => (
                  <section className="deep-topic" key={topic.title}>
                    <h4>{topic.title}</h4>
                    <div className="explain-grid">
                      <p><b>Beginner explanation:</b> {topic.beginner}</p>
                      <p><b>How operators think:</b> {topic.operator}</p>
                    </div>
                    <h5>Parameter breakdown</h5>
                    <div className="param-grid">
                      {topic.parameters.map((param) => (
                        <div className="param" key={param.name}>
                          <strong>{param.name}</strong>
                          <span>{param.meaning}</span>
                          <em>{param.whyItMatters}</em>
                        </div>
                      ))}
                    </div>
                    <div className="split">
                      <p><b>Business scenario:</b> {topic.scenario}</p>
                      <p><b>Excel logic:</b> {topic.excel}</p>
                    </div>
                    {topic.calculation && <p className="formula"><b>Calculation:</b> {topic.calculation}</p>}
                    <div className="mistake-box">
                      <div>
                        <h5>Common mistakes</h5>
                        <ul>{topic.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul>
                      </div>
                      <div>
                        <h5>Interview trap</h5>
                        <p>{topic.interviewTrap}</p>
                      </div>
                    </div>
                    <h5>Mastery checks</h5>
                    <ol>{topic.masteryCheck.map((check) => <li key={check}>{check}</li>)}</ol>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="question-bank" className="section question-bank">
        <p className="eyebrow">End-to-end question bank</p>
        <h2>20 confidence-building questions per concept</h2>
        <p className="goal">
          Use this as your interview drilling room. Pick a concept, attempt each question out loud or in writing,
          then open the answer guide to check whether your response covered the correct parameters, calculations and business reasoning.
        </p>
        <div className="question-bank-layout">
          <aside className="topic-picker">
            {topicQuestionBank.map((group) => (
              <button
                key={group.id}
                className={group.id === activeQuestionTopic.id ? 'active' : ''}
                onClick={() => setActiveQuestionTopicId(group.id)}
              >
                <strong>{group.topic}</strong>
                <span>{group.questions.length} questions</span>
              </button>
            ))}
          </aside>
          <article className="question-list">
            <div className="question-list-header">
              <div>
                <p className="eyebrow">Selected topic</p>
                <h3>{activeQuestionTopic.topic}</h3>
              </div>
              <strong>{activeQuestionTopic.questions.length}/20</strong>
            </div>
            {activeQuestionTopic.questions.map((item, index) => (
              <details className="drill-question" key={item.question}>
                <summary>
                  <span>Q{index + 1}</span>
                  {item.question}
                </summary>
                <div>
                  <h5>Answer guide</h5>
                  <p>{item.answerGuide}</p>
                </div>
              </details>
            ))}
          </article>
        </div>
      </section>

      <section id="mock-practice" className="section mock-lab">
        <p className="eyebrow">Interactive mock practice</p>
        <h2>Attend mock questions and review your answer</h2>
        <p className="goal">
          Pick a real merchandising case, write your answer like you are in the interview, then submit it.
          The trainer checks whether you covered calculations, diagnosis, operational actions and interview-level tradeoffs.
        </p>

        <div className="mock-layout">
          <aside className="case-picker">
            {mockCases.map((item) => (
              <button
                key={item.id}
                className={item.id === activeCase.id ? 'active' : ''}
                onClick={() => setActiveCaseId(item.id)}
              >
                <span>{item.difficulty}</span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </aside>

          <article className="mock-panel">
            <div className="mock-header">
              <span>{activeCase.difficulty}</span>
              <h3>{activeCase.title}</h3>
            </div>
            <p className="mock-prompt">{activeCase.prompt}</p>

            <div className="mock-data">
              <h5>Given data</h5>
              <ul>{activeCase.data.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>

            <label className="answer-box">
              Your interview answer
              <textarea
                value={currentAnswer}
                onChange={(event) => updateAnswer(event.target.value)}
                placeholder="Structure your answer: calculate → interpret → diagnose → recommend → mention extra data needed..."
              />
            </label>

            <div className="mock-actions">
              <button onClick={submitAnswer} disabled={currentAnswer.trim().length < 20}>Review my answer</button>
              <button className="ghost" onClick={() => updateAnswer('')}>Clear answer</button>
              <span>{review.wordCount} words</span>
            </div>

            {submitted[activeCase.id] && (
              <div className="review-panel">
                <div className="score-card">
                  <strong>{review.score}%</strong>
                  <span>{review.score >= 75 ? 'Interview-ready structure' : review.score >= 50 ? 'Good start, add missing reasoning' : 'Needs more calculation and decision logic'}</span>
                </div>

                <div className="review-grid">
                  <section>
                    <h5>Rubric review</h5>
                    {review.rubricResults.map((item) => (
                      <div className={item.passed ? 'rubric pass' : 'rubric gap'} key={item.label}>
                        <b>{item.passed ? '✓' : '○'} {item.label}</b>
                        <p>{item.why}</p>
                        <small>{item.passed ? `Detected: ${item.matched.join(', ')}` : `Try mentioning: ${item.keywords.slice(0, 4).join(', ')}`}</small>
                      </div>
                    ))}
                  </section>
                  <section>
                    <h5>Expected calculations / logic</h5>
                    <ul>{activeCase.expectedCalculations.map((item) => <li key={item}>{item}</li>)}</ul>
                    <h5>Model answer</h5>
                    <p className="model-answer">{activeCase.modelAnswer}</p>
                  </section>
                </div>

                <div className="review-summary">
                  <p><b>Strengths:</b> {review.strengths.length ? review.strengths.join(' · ') : 'Not enough evidence yet.'}</p>
                  <p><b>Improve next:</b> {review.gaps.length ? review.gaps.join(' · ') : 'Now practice making the answer more concise and interview-natural.'}</p>
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      <section id="final-drill" className="section case-study">
        <p className="eyebrow">Final interview simulation</p>
        <h2>Can you now break down the case like a merchandiser?</h2>
        <p>
          Case: A casual shirt launched with 1,500 units. After 3 weeks it sold 600 units and has 900 units left.
          ASP is ₹1,599, cost is ₹650, marketplace commission is 30%, return provision is ₹100 and replenishment lead time is 45 days.
        </p>
        <div className="questions">
          {finalDrill.map((question) => <div key={question}>Q. {question}</div>)}
        </div>
      </section>
    </main>
  )
}

export default App
