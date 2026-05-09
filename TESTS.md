# Tests

The core of SpendPilot's value proposition is its accurate, deterministic audit engine. To ensure absolute reliability, we use **Vitest**.

### Running Tests
To run the test suite:
```bash
npm run test
```

### Test Coverage

We have implemented 5 core test cases targeting `src/lib/audit-engine.ts`:

1. **Enterprise Misuse Detection**
   - *Scenario:* A team of 5 users inputs a ChatGPT Enterprise plan.
   - *Expectation:* The engine recommends downgrading to the Team plan, accurately calculating $150/mo in savings.

2. **Overlapping Tool Detection**
   - *Scenario:* A team inputs both Cursor Pro and GitHub Copilot Business.
   - *Expectation:* The engine detects redundant coding assistants, flags Copilot as an alternative, and calculates savings based on dropping one tool.

3. **Annual Savings Math**
   - *Scenario:* A user inputs a single tool with $20/mo savings.
   - *Expectation:* The engine verifies `totalAnnualSavings` is exactly $240.

4. **Honest No-Savings Scenario**
   - *Scenario:* A well-optimized stack (e.g., a solo dev on Copilot Business with no overlap).
   - *Expectation:* The engine returns $0 savings and explicitly outputs an honest "Your stack already appears cost-efficient" message.

5. **Downgrade Recommendation**
   - *Scenario:* A 2-person team uses Claude Team (which is meant for larger groups).
   - *Expectation:* The engine recommends Claude Pro individual accounts and calculates the exact price difference.
