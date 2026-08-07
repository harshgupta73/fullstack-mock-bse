package com.arham.mockbseapi.config;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.arham.mockbseapi.entity.Client;
import com.arham.mockbseapi.entity.Employee;
import com.arham.mockbseapi.entity.EmployeeClientMapping;
import com.arham.mockbseapi.entity.Trade;
import com.arham.mockbseapi.repository.ClientRepository;
import com.arham.mockbseapi.repository.EmployeeClientMappingRepository;
import com.arham.mockbseapi.repository.EmployeeRepository;
import com.arham.mockbseapi.repository.TradeRepository;

import lombok.RequiredArgsConstructor;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
	
	private final EmployeeRepository employeeRepository;
	private final ClientRepository clientRepository;
	private final EmployeeClientMappingRepository mappingRepository;
	private final TradeRepository tradeRepository;
	
	private final Random random = new Random();
	
	
	private final String[] stocks = {
	        "TCS",
	        "INFY",
	        "RELIANCE",
	        "SBIN",
	        "ITC",
	        "LT",
	        "HDFCBANK",
	        "ICICIBANK",
	        "WIPRO",
	        "BHARTIARTL"
	};
	

	@Override
	public void run(String... args) throws Exception {

		if (employeeRepository.count() == 0) {
		    generateEmployees();
		}

		if (clientRepository.count() == 0) {
		    generateClients();
		}
		
		if (mappingRepository.count() == 0) {
		    generateMappings();
		}
		
		if (tradeRepository.count() == 0) {
		    generateTrades();
		}
	}
    
    private void generateEmployees() {
		for (int i = 1; i <= 20; i++) {
			
			
		    Employee employee = new Employee();

		    employee.setEmployeeCode(String.format("EMP%03d", i));

		    employee.setName("Employee " + i);

		    employee.setEmail("employee" + i + "@gmail.com");

		    employee.setMobile("900000" + String.format("%04d", i));

		    employeeRepository.save(employee);

		}
	}
    
    private void generateClients() {

        for (int i = 1; i <= 300; i++) {

            Client client = new Client();

            client.setClientCode(String.format("CL%03d", i));

            client.setName("Client " + i);

            client.setPanNumber("PAN" + String.format("%06d", i));

            client.setEmail("client" + i + "@gmail.com");

            client.setMobile("800000" + String.format("%04d", i));

            clientRepository.save(client);
        }

    }
    
    private void generateMappings() {

        List<Employee> employees = employeeRepository.findAll();

        List<Client> clients = clientRepository.findAll();

        for (Client client : clients) {

            Employee employee = employees.get(
                    random.nextInt(employees.size()));

            EmployeeClientMapping mapping =
                    new EmployeeClientMapping();

            mapping.setEmployee(employee);

            mapping.setClient(client);

            mappingRepository.save(mapping);
        }

    }
    
    private void generateTrades() {

        List<Client> clients = clientRepository.findAll();

        for (int i = 1; i <= 5000; i++) {

            Client client = clients.get(
                    random.nextInt(clients.size()));

            Trade trade = new Trade();

            trade.setClient(client);

            trade.setTradeDate(
                    LocalDate.now().minusDays(random.nextInt(365)));

            trade.setStockName(
                    stocks[random.nextInt(stocks.length)]);

            trade.setQuantity(
                    random.nextInt(100) + 1);

            BigDecimal price =
                    BigDecimal.valueOf(random.nextInt(5000) + 100);

            trade.setPrice(price);

            trade.setBrokerage(
                    price.multiply(BigDecimal.valueOf(0.02)));

            tradeRepository.save(trade);
            

        }

    }

}