import './App.css'

type Formula = {
  metric: string
  formula: string
  example: string
  interviewTrap: string
}

type Phase = {
  title: string
  goal: string
  concepts: string[]
  scenario: string
  excel: string
  interviewerChecks: string[]
}

const formulas: Formula[] = [
  {
    metric: 'Sell-through % (ST%)',
    formula: 'Units sold ÷ opening stock × 100',
    example: '240 sold from 800 opening stock = 30% ST%',
    interviewTrap: 'Never call 30% good or bad without asking the time period, category, season, margin and plan.',
  },
  {
    metric: 'Weeks of Supply (WOS)',
    formula: 'Closing stock ÷ average weekly sales',
    example: '560 closing stock ÷ 60 weekly sales = 9.3 WOS',
    interviewTrap: 'Compare WOS with lead time. 2 WOS is dangerous if replenishment takes 6 weeks.',
  },
  {
    metric: 'GMROI',
    formula: 'Gross margin ÷ average inventory cost',
    example: '₹5,00,000 margin ÷ ₹2,00,000 avg inventory cost = 2.5 GMROI',
    interviewTrap: 'High sales with low margin and heavy inventory may still be a weak business result.',
  },
  {
    metric: 'IMU',
    formula: '(MRP - cost) ÷ MRP × 100',
    example: 'MRP ₹2,499, cost ₹650 → 74% IMU',
    interviewTrap: 'IMU is planned markup before markdowns, marketplace commission, logistics and returns.',
  },
  {
    metric: 'Markdown %',
    formula: '(Original price - selling price) ÷ original price × 100',
    example: '₹2,499 to ₹1,499 = 40% markdown',
    interviewTrap: 'Markdown can clear old inventory but can destroy contribution and brand price perception.',
  },
  {
    metric: 'OTB',
    formula: 'Planned sales + planned ending inventory - beginning inventory - on-order',
    example: '₹10L sales + ₹6L EOM stock - ₹4L BOM stock - ₹3L on-order = ₹9L OTB',
    interviewTrap: 'OTB is cash discipline. It prevents buying too much before seeing actual demand.',
  },
]

const phases: Phase[] = [
  {
    title: 'Phase 1 · Retail fundamentals and omnichannel retail',
    goal: 'Understand how cash becomes inventory, inventory becomes sales, and sales become profitable cash again.',
    concepts: ['D2C vs Myntra vs Ajio vs Amazon vs offline', 'SKU, style, option, size curve', 'sales, returns, stock aging, channel allocation'],
    scenario: 'A navy shirt sells fast on D2C but slowly on Amazon. Do not call the product bad; compare traffic, price, listing quality, customer type, reviews, commission and available sizes.',
    excel: 'Daily dashboard tabs: Sales, Stock, Returns, SKU Master, Channel Summary. Use SUMIFS to pull sales by SKU/channel/date.',
    interviewerChecks: ['Can you explain the full product journey?', 'Can you think beyond total sales?', 'Do you know why inventory is cash in physical form?'],
  },
  {
    title: 'Phase 2 · Retail math mastery',
    goal: 'Use numbers to decide replenish, markdown, transfer, pause buying or investigate data mismatches.',
    concepts: ['ST%', 'WOS', 'GMROI', 'IMU/MMU', 'markdown %', 'stock-to-sales ratio', 'weighted averages'],
    scenario: 'A shirt has 45% sell-through in 4 weeks and 4.9 WOS. It looks healthy, but check lead time, seasonality and size mix before reordering.',
    excel: 'ST% = Sales / Opening Stock. WOS = Closing Stock / (Sales / Weeks). Weighted ASP = SUMPRODUCT(Units, ASP) / SUM(Units).',
    interviewerChecks: ['Can you calculate quickly?', 'Can you interpret, not just compute?', 'Can you identify when sales are unprofitable?'],
  },
  {
    title: 'Phase 3 · Excel for merchandising',
    goal: 'Become fast at cleaning, reconciling and summarizing SKU-level retail data.',
    concepts: ['SUMIFS', 'XLOOKUP', 'INDEX MATCH', 'IF', 'SUMPRODUCT', 'pivots', 'dashboards', 'data cleaning'],
    scenario: 'ERP says 500 units, Myntra says 420 and warehouse says 485. Reconcile opening + inward - sales + returns - damaged - reserved - transfers.',
    excel: '=SUMIFS(Sales[Qty],Sales[SKU],A2,Sales[Channel],"Myntra"); =XLOOKUP(A2,SKU_Master[SKU],SKU_Master[Category],"Missing").',
    interviewerChecks: ['Can you build a clean SKU tracker?', 'Can you catch duplicates/missing SKUs?', 'Can you reconcile inventory sources?'],
  },
  {
    title: 'Phase 4 · Inventory and assortment planning',
    goal: 'Plan breadth versus depth, prevent deadstock and protect bestseller availability.',
    concepts: ['breadth vs depth', 'SKU rationalization', 'size ratios', 'deadstock prevention', 'replenishment logic', 'lead time planning'],
    scenario: 'System shows 1,000 units, but most are S/XXL while demand is M/L/XL. Total inventory exists, but saleable inventory is broken.',
    excel: 'Create size curve columns S/M/L/XL/XXL. Compare sales mix % vs stock mix %. Flag variance above 8-10 percentage points.',
    interviewerChecks: ['Do you understand broken size inventory?', 'Can you choose between many styles and deeper buys?', 'Can you reduce deadstock risk?'],
  },
  {
    title: 'Phase 5 · OTB and forecasting',
    goal: 'Use planned sales, stock targets and on-order inventory to control buying budgets dynamically.',
    concepts: ['dynamic OTB', 'sales forecasting', 'inventory budgeting', 'markdown management', 'reforecasting'],
    scenario: 'If actual sales beat plan but replenishment lead time is 45 days, increase OTB only after checking fabric availability, margin and demand quality.',
    excel: 'Forecast = baseline weekly sales × seasonality factor × campaign uplift. OTB = planned sales + planned EOM - BOM - on-order.',
    interviewerChecks: ['Do you buy based on plan or actual performance?', 'Can you protect cash flow?', 'Do you understand markdown impact on OTB?'],
  },
  {
    title: 'Phase 6 · ERP and operational workflows',
    goal: 'Understand how LOGIC ERP-like systems connect procurement, production, warehouse, sales and returns.',
    concepts: ['BOM', 'purchase orders', 'GRN', 'production tracking', 'warehouse bin logic', 'inventory sync', 'reserved stock'],
    scenario: 'Overselling happens when one unit is sold on Myntra but still visible on D2C because ERP sync is delayed. This causes cancellations and marketplace penalties.',
    excel: 'Reconciliation sheet: Opening + GRN + Returns - Sales - Transfers - Damaged - Reserved = Expected Closing. Compare against ERP/channel stock.',
    interviewerChecks: ['Can you explain PO→GRN→stock visibility?', 'Do you know why ERP accuracy matters?', 'Can you diagnose stock mismatch?'],
  },
  {
    title: 'Phase 7 · Quality assurance',
    goal: 'Connect fabric and garment defects to returns, margin loss and customer experience.',
    concepts: ['4-point fabric inspection', 'AQL', 'shrinkage', 'shade variation', 'stitching defects', 'measurement tolerance'],
    scenario: 'A high-selling shirt has rising returns because customers complain about shrinkage. Merchandising must pause replenishment until QA checks fabric and wash test results.',
    excel: 'Return reason pivot by SKU and defect category. Flag return rate above category threshold and connect to vendor/fabric batch.',
    interviewerChecks: ['Can you explain AQL simply?', 'Can you link quality defects to business loss?', 'Can you decide when to block stock?'],
  },
  {
    title: 'Phase 8 · Business and strategic thinking',
    goal: 'Make tradeoffs across margin, volume, channel profitability, liquidation and brand positioning.',
    concepts: ['margin vs volume', 'D2C vs marketplace profitability', 'channel allocation', 'pricing decisions', 'inventory liquidation', 'operational tradeoffs'],
    scenario: 'A slow style with 90+ days aging may be sent to a marketplace event for liquidation, while a limited bestseller may be protected for D2C at lower discount.',
    excel: 'Contribution = ASP - cost - commission - logistics - return provision. Compare by channel before allocating scarce stock.',
    interviewerChecks: ['Can you defend a markdown?', 'Can you prioritize channel allocation?', 'Can you think like an owner, not just a reporter?'],
  },
]

const excelExamples = [
  { name: 'SUMIFS', logic: '=SUMIFS(Sales[Units], Sales[SKU], A2, Sales[Channel], "Myntra")', use: 'SKU-channel sales extraction' },
  { name: 'XLOOKUP', logic: '=XLOOKUP(A2, Master[SKU], Master[Cost], "Missing")', use: 'Bring cost/category from SKU master' },
  { name: 'IF', logic: '=IF(WOS<LeadTimeWeeks,"Replenish risk",IF(ST<20%,"Slow mover","Monitor"))', use: 'Action flags' },
  { name: 'SUMPRODUCT', logic: '=SUMPRODUCT(UnitsRange, ASPRange)/SUM(UnitsRange)', use: 'Weighted ASP' },
  { name: 'Pivot table', logic: 'Rows: Category/SKU/Size; Columns: Channel; Values: Sales, Stock, Returns', use: 'Merchandising review' },
]

const interviewQuestions = [
  'A bestseller has 2 WOS left and replenishment lead time is 6 weeks. What do you do today?',
  'ERP stock, warehouse stock and marketplace stock do not match. How do you reconcile?',
  'A style sells 1,000 units but margin is poor and returns are high. Is it successful?',
  'Opening stock is 1,500 and sales after 3 weeks are 600. Calculate ST%, weekly sales and WOS.',
  'When should you protect stock for D2C instead of sending it to a marketplace campaign?',
]

function App() {
  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">The Bear House internship prep</p>
          <h1>Buying & Merchandising Interview Trainer</h1>
          <p className="hero-copy">
            A practical omnichannel fashion retail course built around inventory crises, retail math,
            Excel logic, ERP workflows, marketplace allocation and interview reasoning.
          </p>
          <div className="hero-actions">
            <a href="#phases">Start curriculum</a>
            <a href="#math" className="secondary">Retail math sheet</a>
          </div>
        </div>
        <aside className="case-card">
          <span>Live case</span>
          <h2>Inventory is cash in physical form</h2>
          <p>₹13 lakh locked into 2,000 shirts only becomes useful if the right sizes sell at the right margin before the season dies.</p>
        </aside>
      </section>

      <section className="grid stats">
        <div><strong>8</strong><span>training phases</span></div>
        <div><strong>10+</strong><span>retail metrics</span></div>
        <div><strong>5</strong><span>Excel decision tools</span></div>
        <div><strong>100%</strong><span>scenario-led</span></div>
      </section>

      <section id="phases" className="section">
        <p className="eyebrow">Curriculum roadmap</p>
        <h2>Learn in real merchandising order</h2>
        <div className="phase-list">
          {phases.map((phase) => (
            <article className="phase" key={phase.title}>
              <h3>{phase.title}</h3>
              <p className="goal">{phase.goal}</p>
              <div className="chips">{phase.concepts.map((concept) => <span key={concept}>{concept}</span>)}</div>
              <div className="split">
                <p><b>Business scenario:</b> {phase.scenario}</p>
                <p><b>Excel logic:</b> {phase.excel}</p>
              </div>
              <ul>{phase.interviewerChecks.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section id="math" className="section">
        <p className="eyebrow">Retail math mastery</p>
        <h2>Metrics interviewers test deeply</h2>
        <div className="cards">
          {formulas.map((item) => (
            <article className="metric" key={item.metric}>
              <h3>{item.metric}</h3>
              <p className="formula">{item.formula}</p>
              <p>{item.example}</p>
              <small>{item.interviewTrap}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section excel">
        <p className="eyebrow">Excel mastery</p>
        <h2>Functions you must be able to explain and use</h2>
        <div className="table">
          {excelExamples.map((row) => (
            <div className="tr" key={row.name}>
              <strong>{row.name}</strong>
              <code>{row.logic}</code>
              <span>{row.use}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section case-study">
        <p className="eyebrow">Interview reasoning drill</p>
        <h2>Never answer with only a formula</h2>
        <p>
          If a casual shirt opens with 1,500 units and sells 600 units in 3 weeks, ST% is 40%,
          weekly sales are 200, and WOS is 900 ÷ 200 = 4.5 weeks. Before reordering, check lead time,
          size mix, channel margin, return rate, stock aging, seasonality and whether sales came from heavy discounting.
        </p>
        <div className="questions">
          {interviewQuestions.map((question) => <div key={question}>Q. {question}</div>)}
        </div>
      </section>
    </main>
  )
}

export default App
