// Dataset of Jammu & Kashmir Post Offices (Featuring Balkote PIN 193123)
const jkPostOffices = [
    { name: "Balkote Branch BO", pin: "193123", type: "Branch Office (BO)", district: "Baramulla / Uri", status: "Active (BPM Badrulnisa)" },
    { name: "Srinagar GPO", pin: "190001", type: "Head Office (HO)", district: "Srinagar", status: "Active" },
    { name: "Jammu Head Office", pin: "180001", type: "Head Office (HO)", district: "Jammu", status: "Active" },
    { name: "Anantnag MDG", pin: "192101", type: "Mukhya Dak Ghar", district: "Anantnag", status: "Active" },
    { name: "Baramulla HO", pin: "193101", type: "Head Office (HO)", district: "Baramulla", status: "Active" },
    { name: "Uri Sub Office", pin: "193123", type: "Sub Office (SO)", district: "Baramulla", status: "Active" },
    { name: "Leh Head Office", pin: "194101", type: "Head Office (HO)", district: "Leh", status: "Active" }
];

// Schemes Detail Data
const schemeDetails = {
    ssa: {
        title: "Sukanya Samriddhi Account (SSA)",
        rate: "7.6% Per Annum",
        eligibility: "Parents can open an account for a girl child aged up to 10 years.",
        minMax: "Min ₹250 per year | Max ₹1,50,000 per year",
        lockin: "Matures when the girl turns 21 years old.",
        tax: "Qualifies for tax rebate under Section 80C. Interest earned is tax-free."
    },
    ppf: {
        title: "Public Provident Fund (PPF)",
        rate: "7.1% Per Annum",
        eligibility: "Any resident Indian adult or parent on behalf of a minor.",
        minMax: "Min ₹500 per year | Max ₹1,50,000 per year",
        lockin: "15 Years mandatory lock-in period.",
        tax: "EEE Status (Exempt-Exempt-Exempt) under 80C."
    },
    sb: {
        title: "Post Office Savings Account (SB)",
        rate: "4.0% Per Annum",
        eligibility: "Single or Joint Adult, Minor above 10 years.",
        minMax: "Min deposit ₹500 to open account.",
        lockin: "No lock-in period. Instant withdrawal available.",
        tax: "Interest up to ₹10,000 exempt under Section 80TTA."
    },
    mis: {
        title: "Monthly Income Scheme (MIS)",
        rate: "7.4% Per Annum",
        eligibility: "Resident Indian adults (Single/Joint).",
        minMax: "Max ₹9 Lakhs (Single) | Max ₹15 Lakhs (Joint)",
        lockin: "5 Years tenure with monthly payout.",
        tax: "Interest earned is taxable."
    },
    nsc: {
        title: "National Savings Certificate (NSC)",
        rate: "7.7% Per Annum",
        eligibility: "Single/Joint Adult, Minor by guardian.",
        minMax: "Min ₹1,000 (No upper limit)",
        lockin: "5 Years mandatory maturity.",
        tax: "Deduction available under Section 80C."
    },
    td: {
        title: "Time Deposit (TD / FD)",
        rate: "6.9% to 7.5% depending on tenure",
        eligibility: "Individual Adults or Joint Accounts.",
        minMax: "Min ₹1,000 (No upper limit)",
        lockin: "Available in 1, 2, 3, and 5 Year tenures.",
        tax: "5-Year TD is eligible for Section 80C deduction."
    }
};

// Render Post Office Table
function renderPOTable(data) {
    const tbody = document.getElementById('poTableBody');
    tbody.innerHTML = '';

    data.forEach(po => {
        const isBalkote = po.pin === "193123" && po.name.includes("Balkote");
        const row = document.createElement('tr');
        if (isBalkote) row.className = 'balkote-row';

        row.innerHTML = `
      <td>${po.name} ${isBalkote ? '⭐' : ''}</td>
      <td><strong>${po.pin}</strong></td>
      <td>${po.type}</td>
      <td>${po.district}</td>
      <td><span style="color: #2F855A;">${po.status}</span></td>
    `;
        tbody.appendChild(row);
    });
}

// Filter Post Offices
function filterPostOffices() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = jkPostOffices.filter(po =>
        po.name.toLowerCase().includes(query) ||
        po.pin.includes(query) ||
        po.district.toLowerCase().includes(query)
    );
    renderPOTable(filtered);
}

// Calculator Logic
function calculateMaturity() {
    const scheme = document.getElementById('calc-scheme').value;
    const amount = parseFloat(document.getElementById('calc-amount').value) || 0;

    let principal = 0;
    let interest = 0;
    let years = 5;

    if (scheme === 'ssa') {
        years = 15;
        principal = amount * years;
        interest = principal * 1.39; // Approximate SSA compounding factor
    } else if (scheme === 'ppf') {
        years = 15;
        principal = amount * years;
        interest = principal * 1.08;
    } else if (scheme === 'mis') {
        years = 5;
        principal = amount;
        interest = (amount * 0.074) * 5; // Total monthly interest over 5 yrs
    } else if (scheme === 'nsc') {
        years = 5;
        principal = amount;
        interest = amount * 0.449; // NSC 5yr compounding @ 7.7%
    }

    document.getElementById('calc-years').value = years;
    document.getElementById('res-principal').innerText = '₹' + Math.round(principal).toLocaleString('en-IN');
    document.getElementById('res-interest').innerText = '₹' + Math.round(interest).toLocaleString('en-IN');
    document.getElementById('res-total').innerText = '₹' + Math.round(principal + interest).toLocaleString('en-IN');
}

// Modal Functions
function openSchemeModal(schemeKey) {
    const data = schemeDetails[schemeKey];
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
    <h2 style="color: #D32F2F; margin-bottom: 10px;">${data.title}</h2>
    <div style="background: #DEF7EC; color: #03543F; padding: 6px 12px; border-radius: 6px; display: inline-block; font-weight: bold; margin-bottom: 15px;">
      Interest Rate: ${data.rate}
    </div>
    <p style="margin-bottom: 10px;"><strong>Eligibility:</strong> ${data.eligibility}</p>
    <p style="margin-bottom: 10px;"><strong>Deposit Limit:</strong> ${data.minMax}</p>
    <p style="margin-bottom: 10px;"><strong>Lock-in / Tenure:</strong> ${data.lockin}</p>
    <p style="margin-bottom: 15px;"><strong>Tax Benefits:</strong> ${data.tax}</p>
    <button class="btn btn-primary" onclick="closeSchemeModal()" style="width: 100%;">Close Details</button>
  `;

    document.getElementById('schemeModal').style.display = 'flex';
}

function closeSchemeModal() {
    document.getElementById('schemeModal').style.display = 'none';
}

// Staff Announcement Panel (LocalStorage)
function saveNotice() {
    const text = document.getElementById('noticeInput').value;
    if (text.trim() === "") return;

    localStorage.setItem('balkote_notice', text);
    document.getElementById('noticeText').innerText = text;
    document.getElementById('noticeInput').value = '';
    alert('Notice updated successfully!');
}

function loadNotice() {
    const saved = localStorage.getItem('balkote_notice');
    if (saved) {
        document.getElementById('noticeText').innerText = saved;
    }
}

// Initial Load
window.onload = function() {
    renderPOTable(jkPostOffices);
    calculateMaturity();
    loadNotice();
};