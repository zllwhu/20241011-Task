package org.example.heritagebackend.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.example.heritagebackend.entity.Employee;

import java.util.List;

public interface EmployeeMapper {
    List<Employee> selectAll();

    @Select("SELECT * FROM employee WHERE id = #{id}")
    Employee selectById(Integer id);

    void add(Employee employee);

    void updateById(Employee employee);

    @Delete("DELETE FROM employee WHERE id = #{id}")
    void deleteById(Integer id);
}