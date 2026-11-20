package net.zayd.webmvcproducts.web;

import net.zayd.webmvcproducts.entities.Product;
import net.zayd.webmvcproducts.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ProductRestAPI {
    private ProductRepository productRepository;

    public ProductRestAPI(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    @GetMapping("/products")
    public List<Product> listProducts(){
        return productRepository.findAll();
    }
    @GetMapping("/products/{id}")
    public Product findById(@PathVariable(name = "id") Long id){
        return productRepository.findById(id).get();
    }
    @DeleteMapping("/products/{id}")
    public void deleteById(@PathVariable(name = "id") Long id){
        productRepository.deleteById(id);
    }
    @PostMapping("/products")
    public Product save(@RequestBody Product product){
        return productRepository.save(product);
    }
    @PutMapping("/products/{id}")
    public Product update(@PathVariable(name = "id") Long id, @RequestBody Product product){
        product.setId(id);
        return productRepository.save(product);
    }
    @GetMapping("/products/search")
    public List<Product> search(@RequestParam(name = "keyword") String keyword){
        return productRepository.findByNameContains(keyword);
    }
}
